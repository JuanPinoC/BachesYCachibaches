import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div>Categoria 1</div>
        <div>Categoria 2</div>
        <div>Categoria 3</div>
    </div>
);

export default drawerToggle;