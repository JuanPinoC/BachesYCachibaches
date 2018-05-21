import React from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './BarraCategorias.css';
import Elemento from './Elemento/Elemento.js';

const barraCategorias = () => (
	<ul className={Classes.Lista}>
		<Elemento nombre='Vehículos' img={'vehiculos.png'}/>
		<Elemento nombre='Inmuebles' img={'inmuebles.png'}/>
		<Elemento nombre='Hogar' img={'hogar.png'}/>
		<Elemento nombre='Música' img={'musica.png'}/>
		<Elemento nombre='Animales' img={'animales.png'}/>
		<Elemento nombre='Servicios' img={'servicios.png'}/>
		<Elemento nombre='Tecnología' img={'tecnologia.png'}/>
		<Elemento nombre='Moda' img={'moda.png'}/>
		<Elemento nombre='Libros' img={'libros.png'}/>
	</ul>
)

export default barraCategorias;