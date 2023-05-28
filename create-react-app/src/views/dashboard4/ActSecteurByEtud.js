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

const TotalGrowthBarChart = ({ isLoading, actSecteurEtude }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    var labels = actSecteurEtude && actSecteurEtude.label;
    var parents = actSecteurEtude && actSecteurEtude.parent;
    var values = actSecteurEtude && actSecteurEtude.nbr;
    var data = [
        {
            type: 'treemap',
            labels: labels,
            values: values,
            parents: parents,
            branchvalues: 'total',
            marker: { colors: ['pink', 'royalblue', 'lightgray', 'purple', 'cyan', 'lightblue', 'lightblue'] }
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
                            <Plot
                                data={data}
                                layout={{
                                    width: 700,
                                    height: 700,
                                    title: "Treemap : les secteurs d'activités par rapport au niveau d'etude",
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
