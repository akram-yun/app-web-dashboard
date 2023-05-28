import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import png from './../../assets/images/travail.png';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { useEffect } from 'react';
import DashboardService from 'services/DashboardService';
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    height: 75,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading, tauxChomage, nbrChomage }) => {
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
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[600],
                                            color: '#fff'
                                        }}
                                    >
                                        <img src={png} alt="photto" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: -2 }}>
                                        Taux de personne ayant un travail
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: '#fff', mt: 0.3 }}>
                                        {nbrChomage.toLocaleString('en-US')}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'red' }}>
                                        {tauxChomage}%
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
