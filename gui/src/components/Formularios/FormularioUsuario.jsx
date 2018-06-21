import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Spinner from '../Spinner/Spinner';
import Foto from './Foto/Foto';
import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioUsuario extends Component {

	constructor(props) {
		super(props);
		this.state = 
			(typeof props.tipo != 'undefined')?
				{
					tipo: 'Editar'
				}:{
					tipo: 'Crear'
				};

		this.AtributoHandler = this.AtributoHandler.bind(this);
	}

	componentWillMount = () => {
		if(this.state.tipo === 'Editar'){
			this.getUsuario();
		}else{
			this.setState({load:true})
		}
	}

	getUsuario = () => {
		axios.get('usuarios/find',{
			headers: { 
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		})
		.then(response => {
			const data = response.data.product
			this.setState({
				data: data,
				_id: data._id,
				apellidos: data.apellidos,
				email: data.email,
				foto: data.foto,
				nombres: data.nombres,
				puntuacion: data.puntuacion,
				load: true
			});
			console.log(this.state);
		}).catch(response => {
			console.log(response);
		});
	}

	AtributoHandler = (campo, valor) => {
    	this.setState({ [campo]: valor });
  	}

  	SubmitHandler = (e) => {
  		const data = this.state;

  		const formData = new FormData();
  		formData.append("nombres",data.nombres);
  		formData.append("apellidos",data.apellidos);
  		formData.append("email",data.email);
  		formData.append("contrasenia",data.contrasenia);
  		formData.append("direccion",data.direccion);
  		formData.append("celular",data.celular);
  		formData.append("telefono",data.telefono);
  		formData.append("foto",data.foto);

  		axios({
  			method: 'post',
  			url: 'usuarios/',
  			data: formData,
  			headers: { 
				'Content-Type': 'multipart/form-data',
			}
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
  		return (!this.state.load)?
  			(<Spinner/>
  			):(
			<div className={Classes.Formulario}>
			<center><h1>{this.state.tipo} Usuario</h1></center>
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