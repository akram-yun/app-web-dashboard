// assets
import { IconUser } from '@tabler/icons';

// constant
const icons = {
    IconUser
};

// ==============================|| EXTRA profile MENU ITEMS ||============================== //

const profile = {
    id: 'profile',
    title: 'profile',
    type: 'group',
    children: [
        {
            id: 'user-profile',
            title: "profil d'utilisateur",
            type: 'item',
            url: '/profile',
            icon: icons.IconUser,
            breadcrumbs: false
        }
    ]
};

export default profile;
