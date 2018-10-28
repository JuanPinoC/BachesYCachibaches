import React from 'react';
import classes from './Compra.css';

const compra = (props) => {
	const data = props.data;
	return(
		<div className={classes.Compra}>
			<h2>Anuncio: {data.titulo}</h2>
			<h3>Precio:  S/. {data.precio}</h3>
			<h4>Comprado a: {data.vendedor}</h4>
			<h4>Correo del vendedor: {data.email}</h4>
		</div>
	)		
};

export default compra;