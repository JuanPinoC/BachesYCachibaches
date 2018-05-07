import React from 'react';

import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <li className={classes.BarSuperiorBtn}>Ingresar</li>
    	<li className={classes.BarSuperiorBtn}>Registrarse</li>
        <li className={classes.BarSuperiorBtn}>Nosotros</li>
        <li className={classes.BarSuperiorBtn}>Info</li>
    </ul>
);

export default navigationItems;