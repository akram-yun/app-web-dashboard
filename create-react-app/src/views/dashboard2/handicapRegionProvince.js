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

const PopularCard = ({ isLoading, handicapRegionProvince }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    var data = handicapRegionProvince && [
        {
            type: 'sunburst',
            labels: handicapRegionProvince.labels,
            parents: handicapRegionProvince.parent,
            values: handicapRegionProvince.nombre,
            outsidetextfont: { size: 20, color: '#377eb8' },
            leaf: { opacity: 0.4 },
            branchvalues: 'total',
            marker: { line: { width: 1 } },
            insidetextorientation: 'radial'
        }
    ];
    var layout = {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        width: 800,
        height: 400,
        title: 'Exploration du taux de handicap dans les régions et provinces marocaines',
        margin: { l: 0, r: 0, b: 0, t: 100 }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>{isLoading ? <SkeletonPopularCard /> : <MainCard content={false}>{<Plot data={data} layout={layout} />}</MainCard>}</>;
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
