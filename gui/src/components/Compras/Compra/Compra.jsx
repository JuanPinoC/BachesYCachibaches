import React from 'react';
import classes from './Compra.css';

const compra = (props) => {
	const data = props.data;
	console.log(data);
	return(
		<div className={classes.Compra}>
			<h2>Anuncio: {data.anuncio.titulo}</h2>
			<h3>Precio:  S/. {data.anuncio.precio}</h3>
			<h4>Comprado a: {data.vendedor.nombres}</h4>
			<h4>Correo del vendedor: {data.vendedor.email}</h4>
		</div>
	)		
};

export default compra;