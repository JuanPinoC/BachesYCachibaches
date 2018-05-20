import React from 'react';
import {Switch, Route} from 'react-router-dom';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Searchbar from '../SearchBar/SearchBar';
import Usuario from '../../Perfil/Usuario/Usuario';
import Login from '../../Login/login';

const toolbar = ( props ) => (
    <div>
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div className={classes.SearchBar}>
        	<Searchbar />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
    <Switch>
        <Route path="/ingresar" component={Login}/>
        <Route path="/registrarse" component={Usuario}/>
        <Route path="/" component={Login}/>
    </Switch>
    </div>
);

export default toolbar;
