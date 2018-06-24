import React from 'react';

import Classes from './Usuario.css';
import Valoracion from '../Valoracion/Valoracion.js';
import foto from './userExample.png';

const usuario = (props) => {
	
	const data = props.data;
	console.log(data);

	return(
		<tr className={Classes.Usuario}>
			<td className={Classes.Imagen}>
				<img src={(data.foto)?require("../../../backend/profilePictures/" + data.foto.substring(16)):foto}/>
			</td>
			<td className={Classes.Info}>
				<Valoracion val={(data.puntuacion)/20}/>
				<h3><label>Nombre: </label>{data.nombres + " " + data.apellidos}</h3>
				<h3><label>E-mail: </label>{data.email}</h3>
				<h3><label>Teléfono: </label>{data.telefono}</h3>
				<h3><label>Celular: </label>{data.celular}</h3>
				<h3><label>Dirección: </label>{data.direccion}</h3>
			</td>
			<td className={Classes.Opciones}>
				<center><h2>Opciones</h2></center>
				<div><h2>Contactar</h2></div>
				<div><h2>Reportar</h2></div>
			</td>
		</tr>
	);
}

export default usuario;