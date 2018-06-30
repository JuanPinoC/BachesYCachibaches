import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItemsUser from '../NavigationItems/NavigationItemsLoggedUser';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Searchbar from '../SearchBar/SearchBar';
import UserInfo from '../..//UserInfo/UserInfo';


const toolbar = ( props ) => (
    <div>
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <NavLink to="/">
                <Logo />
            </NavLink>
        </div>
        <div className={classes.SearchBar}>
        	<Searchbar />
        </div>
        <nav className={classes.DesktopOnly}>
            {
                (sessionStorage.getItem('jwtToken')!="null")?
                <NavigationItemsUser action={props.action}/>:<NavigationItems/>    
            }
        </nav>
    </header>
    {(sessionStorage.getItem('jwtToken')!="null")?<UserInfo />:<div></div>}
    </div>
);

export default toolbar;
