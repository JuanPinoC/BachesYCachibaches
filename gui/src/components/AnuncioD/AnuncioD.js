import React from 'react';

import Classes from './AnuncioD.css';
import img from './img.jpg';
import imgDestacado from './star.png';

const categoria = () => (
	<tr className={Classes.Publicacion}>
		<td className={Classes.Imagen}>
			<img src={img}/>
		</td>
		<td className={Classes.Info}>
			<h2 className={Classes.Precio}>$100</h2>
			<h2>Titulo de la Publicación</h2>
			<p>Descripción de la publicación</p>
			<a href='#'>Usuario</a>
			<img className={Classes.Destacado} src={imgDestacado}/>
		</td>
	</tr>
)

export default categoria;