import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import Plot from 'react-plotly.js';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, mapData }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    if (mapData) {
        var cityName = mapData.region,
            cityPop = mapData.population,
            cityLat = mapData.latitude,
            cityLon = mapData.longtitude,
            color = [, 'rgb(255,65,54)', 'rgb(133,20,75)', 'rgb(255,133,27)', 'lightgrey'],
            citySize = [],
            hoverText = [],
            scale = 20000;
        for (var i = 0; i < cityPop.length; i++) {
            var currentSize = cityPop[i] / scale;
            var currentText = cityName[i] + ' pop: ' + cityPop[i];
            citySize.push(currentSize);
            hoverText.push(currentText);
        }
    }
    var data = mapData && [
        {
            type: 'scattergeo',
            lat: cityLat,
            lon: cityLon,
            hoverinfo: 'text',
            text: hoverText,
            marker: {
                size: citySize,
                line: {
                    color: 'black',
                    width: 2
                }
            }
        }
    ];
    var layout = mapData && {
        title: 'Démographie marocaine en 2014',
        showlegend: false,
        width: 380,
        height: 600,
        dragmode: 'zoom',
        margin: { r: 0, t: 150, b: 0, l: 0 },
        geo: {
            scope: 'africa',
            center: { lon: -7.63, lat: 15.79 },
            zoom: 3,
            projection: { type: 'mercator' },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>{isLoading ? <SkeletonPopularCard /> : <MainCard content={false}>{mapData && <Plot data={data} layout={layout} />}</MainCard>}</>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
