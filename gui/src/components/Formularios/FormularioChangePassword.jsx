import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioChangePassword extends Component {

	constructor(props) {
		super(props);
		this.state = {
				userId: 'IDUsuario'
				contrasenia: '',
				newpass: ''
			};
		this.AtributoHandler = this.AtributoHandler.bind(this);
	}

	AtributoHandler = (campo, valor) => {
    	this.setState({ [campo]: valor });
  	}

  	SubmitHandler = (e) => {
  		e.preventDefault();
  		const data = this.state;
  		axios({
  			method: 'post',
  			url: 'changePassword/',
  			data: data,
  			config: { headers: {'Content-Type': 'multipart/form-data' }}
  		})
  		.then(function (response) {
  			//handle success
  			console.log(response);
  		})
  		.catch(function (response) {
  			//handle error
  			console.log(response);
  		});
  	}

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Cambiar Contraseña</h1></center>
			<hr/>
			<div className={Classes.Form}>
				<div className={Classes.Parte}>
					<Atributo titulo={"Antigua Contraseña"} nombre={"contrasenia"} tipo={"text"} 
								contenido={this.state.contrasenia} action={this.AtributoHandler} />
					<Atributo titulo={"Nueva contraseña"} nombre={"newpass"} tipo={"text"}
								contenido={this.state.newpass} action={this.AtributoHandler} />
				</div>
				<div className={Classes.Botones}>
					<button className={Classes.BtnCrear} onClick={this.SubmitHandler}>
						<h2>Cambiar</h2>
					</button>
					<button className={Classes.BtnCancelar}>
						<h2>Cancelar</h2>
					</button>
				</div>
			</div>
			</div>
		);
  	}

}

export default formularioChangePassword;