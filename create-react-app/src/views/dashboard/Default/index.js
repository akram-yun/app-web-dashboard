import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './SelectRegion';
import PopularCard from './PopulationMap';
import TotalOrderLineChartCard from './Population';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import DashboardService from 'services/DashboardService';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [nombrePopulation, setNombrePopulation] = useState('...');
    const [percentUrbain, setPercentUrbain] = useState('...');
    const [nbrUrbain, setNbrUrbain] = useState('...');
    const [percentRural, setPercentRural] = useState('...');
    const [nbrRural, setNbrRural] = useState('...');
    const [funnelAgeData, setFunnelAgeData] = useState(null);
    const [mapData, setMapData] = useState(null);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedRegionForApi, setSelectedRegionForApi] = useState(null);

    const GetNombrePopulationAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });
        const data = await DashboardService.getNbrByData(p);
        setNombrePopulation(data.data.nbr_total);
        setPercentUrbain(data.data.pop_urbain);
        setNbrUrbain(data.data.nbr_urbain);
        setPercentRural(data.data.pop_rural);
        setNbrRural(data.data.nbr_rural);
    };
    const GetAgeDataAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });
        const data = await DashboardService.getAgeData(p);
        setFunnelAgeData(data.data);
    };
    const GetMapDataAPI = async () => {
        const p = {};
        selectedRegion &&
            selectedRegion.map((item, i) => {
                p[item.REG] = i;
            });
        const data = await DashboardService.getMapData(p);
        setMapData(data.data);
    };
    useEffect(() => {
        selectedRegion && GetNombrePopulationAPI();
        selectedRegion && GetAgeDataAPI();
        selectedRegion && GetMapDataAPI();
        setLoading(false);
    }, [selectedRegion]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard
                            isLoading={isLoading}
                            selectedRegionForApi={selectedRegionForApi}
                            nombrePopulation={nombrePopulation}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard
                                    isLoading={isLoading}
                                    percentUrbain={percentUrbain}
                                    nbrUrbain={nbrUrbain}
                                    selectedRegionForApi={selectedRegionForApi}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} percentRural={percentRural} nbrRural={nbrRural} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} funnelAgeData={funnelAgeData} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} mapData={mapData} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
