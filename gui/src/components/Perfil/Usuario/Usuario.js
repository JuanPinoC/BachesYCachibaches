import React from 'react';

import Classes from './Usuario.css';
import Valoracion from '../Valoracion/Valoracion.js';
import foto from './userExample.png';

const usuario = () => (
	<tr className={Classes.Usuario}>
		<td className={Classes.Imagen}>
			<img src={foto}/>
		</td>
		<td className={Classes.Info}>
			<Valoracion val={4}/>
			<h3><label>Nombre: </label>Nombre del Usuario</h3>
			<h3><label>E-mail: </label>E-mail del Usuario</h3>
			<h3><label>Teléfono: </label>Teléfono del Usuario</h3>
			<h3><label>Dirección: </label>Dirección del Usuario</h3>
			<h3><label>Descripción: </label>Descripción del Usuario</h3>
		</td>
		<td className={Classes.Opciones}>
			<center><h2>Opciones</h2></center>
			<div><h2>Contactar</h2></div>
			<div><h2>Reportar</h2></div>
		</td>
	</tr>
)

export default usuario;