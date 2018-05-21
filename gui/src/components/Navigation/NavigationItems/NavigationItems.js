import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>  
        <NavLink to="/ingresar" exact >
            <li className={classes.BarSuperiorBtn}>Ingresar</li>
        </NavLink>
    	<NavLink to="/registrarse" exact >
            <li className={classes.BarSuperiorBtn}>Registrarse</li>
        </NavLink>
        <NavLink to="/nosotros" exact >
            <li className={classes.BarSuperiorBtn}>Nosotros</li>
        </NavLink>
        <NavLink to="/info" exact >
            <li className={classes.BarSuperiorBtn}>Info</li>
        </NavLink>
    </ul>
);

export default navigationItems;