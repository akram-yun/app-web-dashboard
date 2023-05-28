import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Plot from 'react-plotly.js';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, funnelAgeData }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    var data = funnelAgeData && [
        {
            type: 'funnel',
            name: 'Féminin',
            y: funnelAgeData.ageLabel,
            x: funnelAgeData.nombreFemale,
            textinfo: 'value+percent initial',
            marker: { color: '#F7BAC5' }
        },
        {
            type: 'funnel',
            name: 'Masculin',
            y: funnelAgeData.ageLabel,
            x: funnelAgeData.nombreMale,
            marker: { color: '#59D4E8' },
            textposition: 'inside',
            textinfo: 'value+percent previous'
        }
    ];

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            {funnelAgeData && (
                                <Plot
                                    data={data}
                                    layout={{ width: 700, height: 700, title: 'Répartition par âge et sexe de la population' }}
                                />
                            )}
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
