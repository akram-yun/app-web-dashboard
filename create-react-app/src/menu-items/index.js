import dashboard from './dashboard';
import pages from './pages';
import admin from './admin';
import utilities from './utilities';
import other from './other';
import profile from './profile';
import userServices from 'services/userServices';
import { useState } from 'react';
// ==============================|| MENU ITEMS ||============================== //
var items;
const role = localStorage.getItem('role');
const menuItems = {};
if (role == 1) {
    menuItems.items = [dashboard, profile, admin];
} else {
    menuItems.items = [dashboard, profile];
}

export default menuItems;
