import React from 'react';
import classes from './Comentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';

const comentario = (props) => {
	let img = (true)?
				('../../../../../backend/profilePictures/default.jpeg')
				:imgUsuario;

	return (
		<tr className={classes.Comentario}>
			<td className={classes.ComentarioUsuario}>
				<img src={ img }/>
				<a src='/usuario'>{props.usuario}</a>
			</td>
			<td className={classes.ComentarioTexto}>
				<p>{props.comentario}</p>
			</td>
			<td className={classes.ComentarioFecha}>
				<p>{props.fecha}</p>
			</td>
		</tr>
	);
}


export default comentario;