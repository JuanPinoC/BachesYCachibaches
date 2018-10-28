import React from 'react';
import classes from './PageNotFound.css';

const error = () => (
	<div className={classes.PageNotFound}>
		<center>
			<h1>La pagina que busca no existe.</h1>
			<img src="https://d30y9cdsu7xlg0.cloudfront.net/png/495400-200.png" alt="sad panda"/>
		</center>
	</div>
	);

export default error;