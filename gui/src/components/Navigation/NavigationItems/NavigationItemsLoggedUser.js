import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItems.css';

const navigationItemsLoggedUser = () => (
    <ul className={classes.NavigationItems}>  
        <NavLink to="/perfil" exact >
            <li className={classes.BarSuperiorBtn}>Perfil</li>
        </NavLink>
    	<NavLink to="/misAnuncios" exact >
            <li className={classes.BarSuperiorBtn}>Anuncios</li>
        </NavLink>
        <NavLink to="/cuenta" exact >
            <li className={classes.BarSuperiorBtn}>Cuenta</li>
        </NavLink>
        <NavLink to="/salir" exact >
            <li className={classes.BarSuperiorBtn}>Salir</li>
        </NavLink>
    </ul>
);

export default navigationItemsLoggedUser;