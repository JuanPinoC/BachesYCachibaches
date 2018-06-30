import React from 'react';
import classes from './TitlesNav.css';

const titleNav = (props) => (
		<div className={classes.TitlesNav}>
		<p>
			<a href="/">Animales</a>►<a href="/">Gatos</a>
		</p>
		</div>
	);

export default titleNav;