import React from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Anuncio.css';
import img from './img.jpg';
import imgDestacado from './star.png';

const anuncio = (props) => (
	<tr>
		<NavLink to={"/anuncio/"+props.nombre} exact >
			<tr className={Classes.Publicacion}>
				<td className={Classes.Imagen}>
					<img src={img}/>
				</td>
				<td className={Classes.Info}>
					<h2 className={Classes.Precio}>$100</h2>
					<h2>{props.nombre}</h2>
					<p>Descripción de la publicación</p>
					<a href='#'>Usuario</a>
					<img className={Classes.Destacado} src={imgDestacado}/>
				</td>
			</tr>
		</NavLink>
	</tr>
)

export default anuncio;