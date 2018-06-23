import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Spinner from '../Spinner/Spinner';
import Foto from './Foto/Foto';
import Atributo from './Atributo/Atributo';

import img from '../Perfil/Usuario/user.png';

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
		axios.get('usuarios/edit',{
			headers: { 
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		})
		.then(response => {
			const data = response.data.usuario;

			this.setState({
				data: data,
				apellidos: data.apellidos,
				celular: data.celular,
				direccion: data.direccion,
				email: data.email,
				fotoUrl: data.foto,
				latitud: data.latitud,
				longitud: data.longitud,
				nombres: data.nombres,
				puntuacion: data.puntuacion,
				telefono: data.telefono,
				load: true,
				cambiarFoto: false
			});

		}).catch(response => {
			console.log(response);
		});
	}

	cambiarFoto = () => {
		const oldState = this.state.cambiarFoto;
		
		if(oldState == true){
			this.setState({
				cambiarFoto:!oldState,
				foto: null
			});
		}else{
			this.setState({
				cambiarFoto:!oldState
			});
		}

	}

	AtributoHandler = (campo, valor) => {
    	this.setState({ [campo]: valor });
  	}

  	SubmitHandler = (e) => {

  		const data = this.state;
  		const file = data.foto;

  		const formData = new FormData();
  		formData.append("nombres",data.nombres);
  		formData.append("apellidos",data.apellidos);
  		formData.append("email",data.email);
  		formData.append("contrasenia",data.contrasenia);
  		formData.append("direccion",data.direccion);
  		formData.append("celular",data.celular);
  		formData.append("telefono",data.telefono);
  		
  		if(file){
  			formData.append("foto",file,file.name);
  		}

  		let url = 'usuarios/';

  		if(data.tipo == "Editar"){
  			url = url + 'update';
  		}

  		const params = {
  			method: 'post',
  			url: url,
  			data: formData,
  			headers: {
				'Content-Type': 'multipart/form-data',
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
  		};

  		axios(params)
  		.then( (response) => {
  			//handle success
  			let redirect = <Redirect to="/" />;
  			this.setState({
  				redirect: redirect
  			});
  		})
  		.catch( (response) => {
  			//handle error
  			console.log(response);
  		});
  	}

  	render(){
  		return (!this.state.load)?
  			(<Spinner/>
  			):(
			<div className={Classes.Formulario}>
			{this.state.redirect}
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
						tipo={"password"} contenido={this.state.contrasenia} action={this.AtributoHandler}/>
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Dirección"} nombre={"direccion"}
        				tipo={"text"} contenido={this.state.direccion} action={this.AtributoHandler}/>
					<Atributo titulo={"Celular"} nombre={"celular"}
						tipo={"number"} contenido={this.state.celular} action={this.AtributoHandler}/>
					<Atributo titulo={"Teléfono"} nombre={"telefono"}
						tipo={"number"} contenido={this.state.telefono} action={this.AtributoHandler}/>
				</div>
				<br/>
				<br/>
				{(	(this.state.tipo == "Crear") ||
					(this.state.tipo == "Editar" && this.state.cambiarFoto))?
					(
					<div>
						<Foto action={this.AtributoHandler}/>
						{(this.state.tipo == "Editar")?
							(<button className={Classes.BtnFotoCancel} onClick={this.cambiarFoto}>
								<h3>Cancelar</h3>
							</button>):(<br/>)}
					</div>
					):
					(
					<div className={Classes.FotoEditar}>
						<img src={(typeof this.state.load)?
									require('../../backend/profilePictures/'+this.state.fotoUrl.substring(16)):
									img}/>
						<br/>
						<button className={Classes.BtnCambiarFoto} onClick={this.cambiarFoto}>
							<h3>Cambiar Foto</h3>
						</button>
					</div>)
				}

				<div className={Classes.Botones}>
					<button onClick={this.SubmitHandler} className={Classes.BtnCrear}>
						<h2>{this.state.tipo}</h2>
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