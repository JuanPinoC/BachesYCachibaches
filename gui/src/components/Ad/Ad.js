import React from 'react';
import classes from './Ad.css';

const ad = (props) => (
		<div className={classes.Ad}>
			<h3>Regalo Gatitos</h3>
			<button>Contactar</button>
			<img src="http://www.pelopata.com/img/201202/1a27359943fab3484a4a4f025af4a393-1.jpeg"/>
			<p>Regalo estos hermosos gatitos recien nacidos para aquellas personas
				que deseen brindarles un hogar</p>
			<span>Gratis</span>

		</div>
	);

export default ad;