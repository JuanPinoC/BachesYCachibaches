import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Foto from './Foto/Foto';
import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioUsuario extends Component {

	constructor(props) {
		super(props);
		this.state =(props.data)?
			{
				tipo: props.data.tipo,
				nombres: props.data.nombres,
				apellidos: props.data.apellidos,
				email: props.data.email,
				contrasenia: props.data.contrasenia,
				direccion: props.data.direccion,
				celular: props.data.celular,
				telefono: props.data.telefono
			}:{};
			
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
  			url: 'usuarios/',
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
			<center><h1>Crear Usuario</h1></center>
			<hr/>
			<div className={Classes.Form}>
				<div className={Classes.Parte}>
					<Atributo titulo={"Nombres"} nombre={"nombres"}
						tipo={"text"} contenido={this.state.nombres} action={this.AtributoHandler} />
					<Atributo titulo={"Apellidos"} nombre={"apellidos"}
						tipo={"text"} contenido={this.state.apellidos} action={this.AtributoHandler}/>
					<Atributo titulo={"E-mail"} nombre={"email"}
						tipo={"email"} contenido={this.state.email} action={this.AtributoHandler}/>
					<Atributo titulo={"Contraseña"} nombre={"contrasenia"}
						tipo={"password"} contenido={this.state.password} action={this.AtributoHandler}/>
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Dirección"} nombre={"direccion"}
        				tipo={"text"} contenido={this.state.direccion} action={this.AtributoHandler}/>
					<Atributo titulo={"Celular"} nombre={"celular"}
						tipo={"number"} contenido={this.state.celular} action={this.AtributoHandler}/>
					<Atributo titulo={"Teléfono"} nombre={"telefono"}
						tipo={"number"} contenido={this.state.telefono} action={this.AtributoHandler}/>
				</div>
				<Foto action={this.AtributoHandler}/>
				<div className={Classes.Botones}>
					<button onClick={this.SubmitHandler} className={Classes.BtnCrear}>
						<h2>Crear</h2>
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

export default formularioUsuario;