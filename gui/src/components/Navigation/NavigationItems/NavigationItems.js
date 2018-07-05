import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>  
        <NavLink to="/ingresar" exact >
            <li>Ingresar</li>
        </NavLink>
    	<NavLink to="/registrarse" exact >
            <li>Registrarse</li>
        </NavLink>
        <NavLink to="/info" exact >
            <li>Información</li>
        </NavLink>
    </ul>
);

export default navigationItems;