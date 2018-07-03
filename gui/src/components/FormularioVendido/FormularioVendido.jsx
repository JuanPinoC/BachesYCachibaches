import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import User from './User/User';
import Classes from './FormularioVendido.css';

export default class formularioVendido extends Component {

	constructor(props){
		super(props);
		this.state = {
			anuncio: props.match.params.id,
			userId: '',
			userName: '',
			inputText: "",
			usuarios: []
		}
		this.usuarioSeleccionado = this.usuarioSeleccionado.bind(this);
	}
	
	inputChange = (e) => {
		this.setState({
			inputText: e.target.value
		});
	}

	getUsuarios = () => {
		
		const data = {
			string: this.state.inputText
		};

      	const params = {
        	method: 'post',
        	url: '/usuarios/search',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};

  		axios(params)
		.then((response) => {
			console.log("Buscar",response);
			const data = response.data.result;
			let usuarios = [];

			for(let i=0,l=data.length;i < l && i < 5; i++){
				usuarios.push(
								<User data={data[i]} action={this.usuarioSeleccionado} />
							);
			}

			this.setState({
				usuarios: usuarios
			});
		})
		.catch((response) => {
			console.log(response);
		});
	}

	usuarioSeleccionado = (user) => {
		this.setState({
			userId: user._id,
			userName: user.nombres
		});
	}

	submitHandler = () => {
		const data = {
			anuncio: this.state.anuncio,
			userId: this.state.userId,
			fecha: Date()
		};

      	const params = {
        	method: 'post',
        	url: '/compras/',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};

  		axios(params)
		.then((response) => {
			let redirect = <Redirect to="/" />;
  			this.setState({
  				redirect: redirect
  			});

		})
		.catch((response) => {
			console.log(response);
		});
	}

  	render(){
  		return (
			<div className={Classes.FormularioVendido}>
				{this.state.redirect}
				<center><h1> Anuncio Vendido </h1></center>
				{(this.state.userId!='')?
					(<div>
						<h3>Usuario seleccionado: {this.state.userName}</h3>
						<button className={Classes.BtnAceptar} onClick={this.submitHandler}>
							<h3>Aceptar</h3>
						</button>
					</div>
					)
					:(<div></div>)}
				<h3>Seleccionar usuario comprador:</h3>
				<hr/>
				<div className={Classes.BarraBusqueda}>
					<input type='text' onChange={this.inputChange} value={this.state.inputText} />
					<button className={Classes.BtnBuscar} onClick={this.getUsuarios}><h3>Buscar</h3></button>
					<button className={Classes.BtnCancelar}><h3>Regresar</h3></button>
				</div>
				<div className={Classes.ListaUsuarios}>
					{this.state.usuarios}
				</div>
			</div>
		);
  	}
}
