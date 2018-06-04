import React from 'react';

import classes from './FormularioComentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';

const formularioComentario = () => (
	<div className={classes.FormularioComentario}>
		<center>
			<img src={imgUsuario}/>
			<textarea/>
			<button>Comentar</button>
		</center>
	</div>
);

export default formularioComentario;