import React from 'react';
import classes from './Agregar.css';


const agregar = (props) => (

		<div className={classes.Horizontal}>
			
			<div>
			<h3>Agregar nueva Publicacion</h3>
			<p>Nombre</p>
			<input></input>
			<p>Categoria</p>
			<input></input>
			<p>Sub Categoria</p>
			<input></input>
			<p>Descripcion</p>
			<input></input>
			<p>Precio</p>
			<input></input>
			
			<center><h3 className={classes.agregar}> Subir Publicacion </h3></center>
			</div>
			
			<div className={classes.cuadrado}>
			</div>
			
		</div>
	);

export default agregar;