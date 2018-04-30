import React from 'react';

import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <a href="/">Opción 1</a>
        <a href="/opcion">Opción 2</a>
    </ul>
);

export default navigationItems;