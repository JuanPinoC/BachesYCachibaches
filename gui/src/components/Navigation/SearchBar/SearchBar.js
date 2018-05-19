import React from 'react';

import classes from './SearchBar.css';
import imgSearch from './search.png'

const searchBar = ( props ) => (
    <div className={classes.SearchBar}>
    	<input />
    	<div className={classes.SearchButton}><img src={imgSearch} /></div>
    </div>
);

export default searchBar;
