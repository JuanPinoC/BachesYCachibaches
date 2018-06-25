import React from 'react';
import classes from './Compra.css';

const compra = (props) => {
	const data = props.data;
	return(
		<div className={classes.Compra}>
			<h3>{data.anuncio.titulo}</h3>
			<h3>{data.anuncio.precio}</h3>
			<h4>{data.usuario.nombres}</h4>
			<h5>{data.usuario.email}</h5>
		</div>
	)
		
	};

export default compra;