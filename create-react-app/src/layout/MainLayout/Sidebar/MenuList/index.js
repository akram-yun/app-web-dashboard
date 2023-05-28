// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import dashboard from '../../../../menu-items/dashboard';
import profile from '../../../../menu-items/profile';
import admin from '../../../../menu-items/admin';
import other from '../../../../menu-items/other';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const role = localStorage.getItem('role');
    if (role == 1) {
        menuItem.items = [dashboard, profile, admin];
    } else {
        menuItem.items = [dashboard, profile];
    }
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
