import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './AnunciosUsuario.css';

import Anuncio from './Anuncio/Anuncio';

export default class anunciosUsuario extends Component{
	
	state = {
		nombre: "Pedro Perez",
		anuncios: []
	}

	render(){
		return(
			<div className={Classes.AnunciosUsuario}>
				<h1>Anuncios de {this.state.nombre}</h1>
				<hr/>
				<NavLink to={"/formularioAnuncio"} exact>
					<button className={Classes.BtnCrear}><h2>Crear Anuncio</h2></button>
				</NavLink>
				<div className={Classes.Anuncios}>
				<center>
					<Anuncio/>
					<Anuncio/>
					<Anuncio/>
				</center>
				</div>
			</div>
		);	
	}
}
