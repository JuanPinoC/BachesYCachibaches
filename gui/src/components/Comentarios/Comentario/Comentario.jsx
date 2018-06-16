import React from 'react';
import classes from './Comentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';
import imgDefault from '../../../backend/profilePictures/default.jpeg';

const comentario = (props) => {

	return (
		<tr className={classes.Comentario}>
			<td className={classes.ComentarioUsuario}>
				<img src={ imgDefault }/>
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