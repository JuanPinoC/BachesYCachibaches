import React from 'react';

import Classes from './Validado.css';

import BarraCategorias from '../BarraCategorias/BarraCategorias.js';
import Busqueda from './Busqueda/Busqueda.js';
import Anuncio from '../Anuncio/Anuncio.js';
import AnuncioD from '../AnuncioD/AnuncioD.js';

const validado = () => (
	<div className={Classes.Horizontal}>
		<div>
			<BarraCategorias className={Classes.Categorias}/>
		</div>
		<div>
		<div className={Classes.Horizontal}>
			<h1 className={Classes.Buscar}>Buscar :</h1>
			<Busqueda />
			</div>
			<hr/>
			<div className={Classes.Publicaciones}>
				<AnuncioD />
				<AnuncioD />
				<Anuncio />
			</div>
			<center><h3 className={Classes.VerMas}> Ver más anuncios </h3></center>
		</div>
	</div>
)

export default validado;