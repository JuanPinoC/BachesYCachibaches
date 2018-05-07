import React from 'react';

import Classes from './Perfil.css';
import Anuncio from '../Anuncio/Anuncio.js';
import Usuario from './Usuario/Usuario.js';

const perfil = () => (
	<div className={Classes.Perfil}>
		<hr/>
		<h1 className={Classes.Titulos}>Perfil del Usuario</h1>
		<hr/>
		<Usuario />
		<hr/>
		<h1 className={Classes.Titulos}>Anuncios</h1>
		<hr/>
		<center>
			<div className={Classes.Publicaciones}>
				<Anuncio />
				<Anuncio />
			</div>
		</center>
	</div>
)

export default perfil;