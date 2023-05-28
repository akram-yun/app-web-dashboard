// assets
import { IconDashboard } from '@tabler/icons';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import WheelchairPickupOutlinedIcon from '@mui/icons-material/WheelchairPickupOutlined';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkOffRoundedIcon from '@mui/icons-material/WorkOffRounded';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Démographie',
            type: 'item',
            url: '/',
            icon: Diversity1OutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'default2',
            title: 'Handicap',
            type: 'item',
            url: '/dashboard2',
            icon: WheelchairPickupOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'default3',
            title: 'Education',
            type: 'item',
            url: '/dashboard3',
            icon: SchoolRoundedIcon,
            breadcrumbs: false
        },
        {
            id: 'default4',
            title: "Secteur D'activités",
            type: 'item',
            url: '/dashboard4',
            icon: WorkOffRoundedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
