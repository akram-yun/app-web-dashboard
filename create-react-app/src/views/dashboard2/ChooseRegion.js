import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect } from 'react';
import DashboardService from 'services/DashboardService';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[200],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    },
    '.multi11': {
        width: '90%'
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, selectedRegion, setSelectedRegion }) => {
    const [Region, setRegion] = useState(null);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const getRegionAPi = async () => {
            const data = await DashboardService.getRegion();
            setRegion(data);
            setSelectedRegion(data);
        };
        getRegionAPi();
    }, []);
    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="Space-between">
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mt: 0.85, mb: 5, color: 'black' }}>
                                        SELECT REGION
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item color={'black'} sx={{ mb: 3.5 }}>
                                <div className="card flex justify-content-center">
                                    <span className="p-float-label">
                                        <MultiSelect
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.value)}
                                            options={Region}
                                            optionLabel="REG"
                                            maxSelectedLabels={2}
                                            className="w-full md:w-100rem multi11"
                                        />
                                        <label htmlFor="ms-cities">Select Region</label>
                                    </span>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
