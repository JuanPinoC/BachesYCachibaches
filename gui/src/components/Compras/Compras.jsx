import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Classes from './Compras.css';

export default class formularioVendido extends Component {

	state = {
		inputText: "",
		selected: null,
		usuarios: []
	}

	getUsuarios = () => {
		axios.post();
	}

	usuarioSeleccionado = () => {

		const data = this.state;
		
      	const params = {
        	method: 'post',
        	url: '/usuarios/',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};

  		axios(params)
		.then((response) => {

			const data = response.data.products;
			let usuarios = [];

			for(let i=0,l=data.length;i < l && i < 5; i++){
				usuarios.push(
								<div className={Classes.Usuario}>
									<h4>Usuario:{data[i].nombres}</h4>
									<h4>Correo:{data[i].email}</h4> 
								</div>
							);
			}

			this.setState({
				usuarios: usuarios
			});
		})
		.catch((response) => {
			console.log(response);
		})
	}

	inputChange = (e) => {
		this.setState({
			inputText: e.target.value
		});
	}

  	render(){
  		return (
			<div className={Classes.FormularioVendido}>
			<center><h1> Anuncio Vendido </h1></center>
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