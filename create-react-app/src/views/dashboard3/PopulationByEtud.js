import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Plot from 'react-plotly.js';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, populationEtude }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    var traces = [];
    populationEtude &&
        Object.keys(populationEtude).map((item, i) => {
            traces[i] = {
                x: populationEtude[item][0],
                y: populationEtude[item][1],
                name: item,
                type: 'bar'
            };
        });
    var layout = { barmode: 'stack' };
    var trace1 = {
        x: ['giraffesss', 'orsangutans', 'mosnkeys', 'giraffes', 'orangutans', 'monkeys'],
        y: [10, 2, 20, 14, 23],
        name: 'SF Zoo',
        type: 'bar'
    };
    var trace3 = {
        x: ['mosnkeys', 'giraffes', 'orangutans', 'monkeys'],
        y: [2, 20, 14, 23],
        name: 'SF Zooo',
        type: 'bar'
    };

    var trace2 = {
        x: ['giraffesss', 'orsangutans', 'mosnkeys', 'giraffes', 'orangutans', 'monkeys'],
        y: [, 12, , 18, , 29],
        name: 'LA Zoo',
        type: 'bar'
    };

    var data1 = [trace1, trace2, trace3];
    var data = traces;
    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Plot
                                data={data}
                                layout={{
                                    width: 700,
                                    height: 700,
                                    title: "Bar Plot : Répartition des niveaux d'éducation en fonction de l'âge",
                                    barmode: 'stack'
                                }}
                            />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
