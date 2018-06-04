import React from 'react';

import classes from './Comentarios.css';

import FormularioComentario from './FormularioComentario/FormularioComentario';
import Comentario from './Comentario/Comentario';

const comentarios = (props) => (
	<div className={classes.Comentarios}>
		<FormularioComentario />
		<br/>
			<Comentario 
				comentario={"quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"} 
				usuario={"User1"} 
				fecha={"08/01/2018"} />
			<Comentario 
				comentario={"laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"}
				usuario={"User2"}
				fecha={"20/04/2018"} />
			<Comentario
				comentario={"Hola mundo!"}
				usuario={"User3"}
				fecha={"05/06/2018"} />
	</div>
);

export default comentarios;