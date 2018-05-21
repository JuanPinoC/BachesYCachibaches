import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './SearchBar.css';
import imgSearch from './search.png'

const searchBar = ( props ) => (
    <div className={classes.SearchBar}>
    	<input />
    	<div className={classes.SearchButton}>
			<NavLink to="/buscar" exact >
				<img src={imgSearch}/>
			</NavLink>
		</div>
    </div>
);

export default searchBar;
