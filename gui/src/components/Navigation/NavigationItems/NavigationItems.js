import React from 'react';

import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <a href="/">Burger Builder</a>
        <a href="/orders">Orders</a>
    </ul>
);

export default navigationItems;