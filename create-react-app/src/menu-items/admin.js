// assets
import { IconSettings } from '@tabler/icons';

// constant
const icons = {
    IconSettings
};

// ==============================|| EXTRA admin MENU ITEMS ||============================== //

const admin = {
    id: 'admin',
    title: 'admin',
    type: 'group',
    children: [
        {
            id: 'user',
            title: "Gestion d'utilisteur",
            type: 'item',
            url: '/utilisateur',
            icon: icons.IconSettings,
            breadcrumbs: false
        }
    ]
};

export default admin;
