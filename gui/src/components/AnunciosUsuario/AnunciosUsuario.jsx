import axios from '../../AxiosFiles/axios';

import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './AnunciosUsuario.css';

import Anuncio from './Anuncio/Anuncio';
import Spinner from '../Spinner/Spinner';


export default class anunciosUsuario extends Component{

	state = {
		nombre: "",
		data: null,
		vistas: [],
		load: null,
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
			console.log("Anuncios",response)
			const data = response.data.orders;
			let vistas = [];
			if (response.data.count < 1) {
				this.setState({load: false});
			}else{
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
			}
  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}

	render(){
		let contenedor = <Spinner/>;
		if (this.state.load) {
			contenedor = this.state.vistas;
		}
		if (this.state.load === false) {
			contenedor = <h2>Aún no tienes anuncios !Animate a crear uno¡</h2>
		}
		return(
			<div className={Classes.AnunciosUsuario}>
				<h1>Anuncios de {this.state.nombre}</h1>
				<hr/>
				<NavLink to={"/formularioAnuncio"} exact>
					<button className={Classes.BtnCrear}><h2>Crear Anuncio</h2></button>
				</NavLink>
				<div className={Classes.Anuncios}>
				<center>
					{contenedor}
				</center>
				</div>
			</div>
		);	
	}
}
