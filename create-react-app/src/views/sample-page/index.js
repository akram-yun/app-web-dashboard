// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Mapp from './mapp';
import { useEffect } from 'react';
import { useState } from 'react';
import DashboardService from 'services/DashboardService';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const [reg_pop, setReg_Pop] = useState();
    const [maxPop, setMaxPop] = useState();
    const getRegionAPi = async () => {
        const data = await DashboardService.getRegionPopulation();
        setReg_Pop(data.data);
        setMaxPop(data.max);
    };
    useEffect(() => {
        getRegionAPi();
    }, []);
    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">{reg_pop && <Mapp reg_pop={reg_pop} maxPop={maxPop} />}</Typography>
        </MainCard>
    );
};

export default SamplePage;
