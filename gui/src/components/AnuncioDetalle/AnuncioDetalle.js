import React from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './AnuncioDetalle.css';
import Valoracion from '../Perfil/Valoracion/Valoracion';
import img from './img.jpg';
import imgUsuario from '../Perfil/Usuario/userExample.png';
import imgDestacado from '../Anuncio/star.png';

const anuncioDetalle = (props) => (
	<center>
		<tr className={Classes.PublicacionDetalle}>
			<td className={Classes.Imagen}>
				<img src={img}/>
			</td>
			<td className={Classes.Info}>
				<h2 className={Classes.Precio}>$100</h2>
				<h2 className={Classes.TituloPublicacionDetalle}>
					{props.nombre||props.match.params.nombre}
				</h2>
				<h4 className={Classes.TextoPublicacionDetalle}>
					quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto
				</h4>
				<h3 className={Classes.TextoPublicacionDetalle}>
					Categoria
				</h3>
			</td>
			<div className={Classes.UsuarioPublicacionDetalle}>
				<div className={Classes.UsuarioImagenDetalle}>
					<img src={imgUsuario}/>
				</div>
				<h4>Usuario</h4>
				<div className={Classes.UsuarioPuntuacionDetalle}>
					<Valoracion val={3}/>
				</div>
			</div>
		</tr>
	</center>
)

export default anuncioDetalle;