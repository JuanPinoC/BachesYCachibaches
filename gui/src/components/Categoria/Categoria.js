import React from 'react';

import Classes from './Categoria.css';

import BarraCategorias from '../BarraCategorias/BarraCategorias.js';
import Subcategorias from './Subcategorias/Subcategorias.js';
import Anuncio from '../Anuncio/Anuncio.js';
 
const categoria = (props) => (
	<div className={Classes.Horizontal}>
		<div>
			<BarraCategorias className={Classes.Categorias}/>
		</div>
		<div>
			<h1 className={Classes.TituloCategoria}>{props.match.params.nombre||'Categoria'}</h1>
			<Subcategorias />
			<hr/>
			<div className={Classes.Publicaciones}>
				<Anuncio />
				<Anuncio />
				<Anuncio />
			</div>
			<center><h3 className={Classes.VerMas}> Ver más anuncios </h3></center>
		</div>
	</div>
)

export default categoria;