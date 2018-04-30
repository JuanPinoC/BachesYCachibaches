import React from 'react';

import appLogo from '../../assets/images/logo-tecsup.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={appLogo} alt="MyApp" />
    </div>
);

export default logo;