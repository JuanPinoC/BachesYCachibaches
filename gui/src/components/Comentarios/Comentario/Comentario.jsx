import React from 'react';
import classes from './Comentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';
import imgDefault from '../../../backend/profilePictures/default.jpeg';

const comentario = (props) => {
	let date = new Date(props.data.fecha);
	
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let dt = date.getDate();
	let h = date.getHours();
	let m = date.getMinutes();
	let ampm = (h > 12)?"P.M.":"A.M.";

	if(dt < 10) {
	  dt = '0' + dt;
	}
	if(month < 10) {
	  month = '0' + month;
	}
	
	let dateString = h+":"+m+" "+ampm+" "+dt+"/"+month+"/"+year; 

	return (
		<tr className={classes.Comentario}>
			<td className={classes.ComentarioUsuario}>
				<img src={require('../../../backend/profilePictures/' + props.data.usuario.foto.substring(16)) }/>
				<a src={'/usuario/find?userId' + props.data.usuario._id}>
					{props.data.usuario.nombres}
				</a>
			</td>
			<td className={classes.ComentarioTexto}>
				<p>{props.data.comentario}</p>
			</td>
			<td className={classes.ComentarioFecha}>
				<p>{dateString}</p>
			</td>
		</tr>
	);
}


export default comentario;