import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import morocco from '../../assets/geo/region_maroc.json';
import morocco_reg from '../../assets/geo/region.json';
import DashboardService from 'services/DashboardService';
import { useState } from 'react';

const Mapp = ({ reg_pop, maxPop }) => {
    const svgRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const infoBoxStyle = {
        position: 'fixed',
        top: `${cursorPosition.y + 10}px`,
        left: `${cursorPosition.x + 10}px`,
        backgroundColor: 'white',
        border: '1px solid black',
        padding: '10px',
        zIndex: 9999
    };
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        // définir la projection de la carte
        const projection = d3.geoMercator().fitSize([800, 600], morocco);
        // créer le chemin pour les frontières de la carte
        const path = d3.geoPath().projection(projection);
        // charger les données de population (remplacer par votre propre méthode de récupération de données)
        const populationData = reg_pop;
        // créer un tableau associant les noms de région aux données de population
        const populationMap = {};
        populationData.forEach((d) => {
            populationMap[d.region] = d.population;
        });
        function showRegionInfo(event, regionName, population) {
            const infoBox = document.getElementById('region-info');
            infoBox.innerHTML = `<h3>${regionName}</h3><p>Population: ${population}</p>`;
            infoBox.style.display = 'block';
            setCursorPosition({ x: event.clientX, y: event.clientY });
        }
        function hideRegionInfo() {
            const infoBox = document.getElementById('region-info');
            infoBox.style.display = 'none';
        }
        const zoom = d3
            .zoom()
            .scaleExtent([1, 8])
            .on('zoom', (event) => {
                // mettre à jour la transformation de la carte lors du zoom
                const newTransform = event.transform.translate(50, 50).scale(2);
                // update the transformation of the SVG element with the new transform object
                svg.attr('transform', newTransform);
            });
        svg.call(zoom);
        // dessiner les frontières de la carte
        const colorScale = d3.scaleLinear().domain([0, maxPop]).range(['#EEE', 'red']);
        function zoomToRegion(d) {
            // obtenir les coordonnées de la région sélectionnée
            const bounds = path.bounds(d);
            // calculer l'échelle et le décalage pour zoomer sur la région
            console.log(bounds);
            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            const x = (bounds[0][0] + bounds[1][0]) / 2;
            const y = (bounds[0][1] + bounds[1][1]) / 2;
            const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / 800, dy / 600)));
            const translate = [800 / 2 - scale * x, 600 / 2 - scale * y];
            // appliquer la transformation de zoom
            // const [x, y] = d3.pointer(d);

            // Appliquez le zoom sur la région cliquée
            const scaleFactor = 1; // Exemple de mise à l'échelle de 2x
            const translateX = 800 / 2 - x * scaleFactor; // Centrez la région cliquée horizontalement
            const translateY = 600 / 2 - y * scaleFactor;
            svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(scaleFactor));
        }
        svg.selectAll('.region')
            .data(morocco.features)
            .enter()
            .append('path')
            .attr('class', 'region')
            .attr('d', path)
            .attr('fill', (d) => {
                // déterminer la couleur de remplissage en fonction de la population
                const population = populationMap[d.properties.name_2];
                return population ? colorScale(population) : '#EEE';
            })
            .on('mouseover', (event, d) => {
                showRegionInfo(event, d.properties.name_2, populationMap[d.properties.name_2]);
            })
            .on('mouseout', () => {
                // masquer les informations supplémentaires sur la région (remplacer par votre propre méthode)
                hideRegionInfo();
            })
            .on('click', (event, d) => {
                // masquer les informations supplémentaires sur la région (remplacer par votre propre méthode)
                zoomToRegion(d);
            });
    });
    return (
        <div>
            <svg ref={svgRef} width={800} height={600}></svg>
            <div style={infoBoxStyle} id="region-info"></div>
        </div>
    );
};

export default Mapp;
