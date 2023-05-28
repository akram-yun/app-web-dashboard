import { useRoutes } from 'react-router-dom';
import config from 'config';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import AuthUser from 'views/pages/authentication/auth-forms/AuthUser';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const [isAdmin, setIsAdmin] = useState(false);
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role == 1) {
            setIsAdmin(true);
        }
    }, []);
    //const { getToken } = AuthUser();
    //const token = getToken();

    return useRoutes([MainRoutes(token, isAdmin), AuthenticationRoutes(token)]);
}
