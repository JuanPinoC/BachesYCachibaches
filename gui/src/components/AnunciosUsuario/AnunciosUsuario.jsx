import axios from '../../AxiosFiles/axios';

import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './AnunciosUsuario.css';

import Anuncio from './Anuncio/Anuncio';

export default class anunciosUsuario extends Component{

	state = {
		nombre: "",
		data: null,
		vistas: []
	}

	componentDidMount = () => {
  		this.agregarAnuncios();
  		this.getUsuario();
	}

	getUsuario = () => {
		axios.get('usuarios/menu',
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			const data = response.data.usuario;
  			this.setState({nombre: data.nombres});

  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}

	agregarAnuncios = () => {
		axios.get('anuncios/usuario',
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {

			const data = response.data.orders;
			let vistas = [];
			
			for(let i=0,l=data.length ;i < l; i++){
				vistas.push(
					<Anuncio data={data[i]} key={i}/>
				);
			}

			this.setState({
				data: data,
				vistas: vistas,
				load: true
			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});
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
					{(this.state.load)?this.state.vistas:(<h1>Cargando...</h1>)}
				</center>
				</div>
			</div>
		);	
	}
}
