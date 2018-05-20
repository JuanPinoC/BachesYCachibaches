import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li className={classes.BarSuperiorBtn}>
        <NavLink
        	to="/ingresar"
        	exact
        >Ingresar</NavLink></li>
    	<li className={classes.BarSuperiorBtn}>
    	<NavLink
    		to="/registrarse"
    		exact
    	>Registrarse</NavLink></li>
        <li className={classes.BarSuperiorBtn}>
        <NavLink
			to="/nosotros"
			exact
        >Nosotros</NavLink></li>
        <li className={classes.BarSuperiorBtn}>
        <NavLink
        	to="/info"
        	exact
        >Info</NavLink></li>
    </ul>
);

export default navigationItems;