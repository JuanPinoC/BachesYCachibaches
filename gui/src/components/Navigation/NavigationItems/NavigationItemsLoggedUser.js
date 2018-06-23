import React from 'react';
import {NavLink} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import classes from './NavigationItems.css';

const navigationItemsLoggedUser = (props) => (
    <ul className={classes.NavigationItems}>
        <NavLink to="/perfil" exact >
            <li className={classes.BarSuperiorBtn}>Perfil</li>
        </NavLink>
    	<NavLink to="/misAnuncios" exact >
            <li className={classes.BarSuperiorBtn}>Anuncios</li>
        </NavLink>
        <NavLink to="/EditarUsuario" exact >
            <li className={classes.BarSuperiorBtn}>Cuenta</li>
        </NavLink>
        <NavLink to="/" exact >
            <li className={classes.BarSuperiorBtn}
                onClick={
                        () => {
                                sessionStorage.setItem('jwtToken', null );
                                props.action();
                            }
            }>Salir</li>
        </NavLink>
    </ul>
);

export default navigationItemsLoggedUser;