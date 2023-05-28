import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
export default function AuthUser() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken == null ? false : userToken;
    };
    const getUser = () => {
        const token = cookies.get('jwt');
        return http.post('/user', token);
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token, name, role) => {
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('name', JSON.stringify(name));
        localStorage.setItem('role', JSON.stringify(role));
        setToken(token);
        setName(name);
        setName(role);
        navigate('/');
    };

    const logout = () => {
        cookies.remove('jwt');
        navigate('/login');
    };

    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return {
        setToken: saveToken,
        token,
        getToken,
        getUser,
        http,
        logout
    };
}
