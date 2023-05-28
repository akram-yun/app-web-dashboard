import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import png from './../../assets/images/heart.png';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { useEffect } from 'react';
import DashboardService from 'services/DashboardService';
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    height: 75,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 200,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 200,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading, tauxBonneSante, nbrbonneSante }) => {
    const theme = useTheme();
    // const GetNombrePopulationAPI = async () => {
    //     const p = {};
    //     const data = await DashboardService.getNbrByData(selectedRegionForApi);
    //     setNombrePopulation(data.data);
    //     console.log(data.data);
    // };
    // useEffect(() => {
    //     GetNombrePopulationAPI();
    // }, [selectedRegion]);
    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar sx={{ mt: -1 }}>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: 'white',
                                            color: '#fff'
                                        }}
                                    >
                                        <img src={png} alt="photto" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[500], mt: -2 }}>
                                        Taux Des Personnes En Bonne Sante
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: '#000', mt: 0.3 }}>
                                        {nbrbonneSante.toLocaleString('en-US')}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#00F700' }}>
                                        {tauxBonneSante}%
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalIncomeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
