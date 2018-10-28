import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Spinner from '../Spinner/Spinner';
import Foto from './Foto/Foto';
import Atributo from './Atributo/Atributo';

import img from '../Perfil/Usuario/user.png';

import Classes from './Formulario.css';
import Modal from '../Modal/Modal';
import EliminarCuenta from '../EliminarCuenta/EliminarCuenta';

class formularioUsuario extends Component {
	constructor(props) {
		super(props);
		this.state = 
			(typeof props.tipo != 'undefined')?
				{
					tipo: 'Editar',
					eliminando: false,
					validated: true,
					validations: {	nombres:true, apellidos: true, email: true,
									direccion: true, celular: true, telefono: true
								}
				}:{
					tipo: 'Crear',
					validated: false,
					validations: {
									nombres: false, apellidos: false, email:false, 
									contrasenia:false, direccion:false, celular:false, telefono:false
								}
				};

		this.AtributoHandler = this.AtributoHandler.bind(this);
		this.validatedFormHandler = this.validatedFormHandler.bind(this);
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

  	validatedFormHandler = (campo, validado) => {
  		let validations = this.state.validations;

  		validations = {...validations, [campo]: validado};

  		this.setState({ validations: validations });
  		this.setState({ validated: this.validateAllFields(validations) });
  	}

  	validateAllFields = (validations) => {
  		for (const i in validations){
  			if(validations[i] != true){
  				return false;
  			}
  		}
  		return true;
  	}

  	SubmitHandler = (e) => {
  		if(this.state.validated == false) return;

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
  			if(this.state.tipo == "Crear"){
  				alert("El usuario no ha sido creado debido a un error");
  			}else{
  				alert("El usuario no ha sido editado debido a un error");
  			}
  		});
  	}

  	eliminarHandler = () =>{
		this.setState({eliminando: true})
	}
	modalHandler = () => {
		this.setState({eliminando: false})
	}

  	render(){
  		return (!this.state.load)?
  			(<Spinner/>
  			):(
			<div className={Classes.Formulario}>
			{this.state.redirect}
			<Modal show={this.state.eliminando} modalClosed={this.modalHandler}>
			<EliminarCuenta closed={this.modalHandler}/>
  			</Modal>
  			<hr/>
			<center><h1>{this.state.tipo} Usuario</h1></center>
			<hr/>
			<div className={Classes.Form}>
				<div className={Classes.Parte}>
					<Atributo titulo={"Nombres"} nombre={"nombres"}
						tipo={"text"} contenido={this.state.nombres} 
						action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="ej. Juan Juancito" />
					<Atributo titulo={"Apellidos"} nombre={"apellidos"}
						tipo={"text"} contenido={this.state.apellidos} 
						action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="ej. Perez Perez" />
					<Atributo titulo={"E-mail"} nombre={"email"}
						tipo={"email"} contenido={this.state.email} 
						action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="ejemplo@ejemplo.com" />
					{(this.state.tipo == "Editar")?
						(<div></div>):
						(
						<Atributo titulo={"Contraseña"} nombre={"contrasenia"}
							tipo={"password"} contenido={this.state.contrasenia} 
							action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="Mayúsculas, Minúsculas, números, signo, min.10 caracteres" />
						)
					}
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Dirección"} nombre={"direccion"}
        				tipo={"text"} contenido={this.state.direccion} 
        				action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="ej. Av. Ejemplo-111" />
					<Atributo titulo={"Celular"} nombre={"celular"}
						tipo={"number"} contenido={this.state.celular} 
						action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="ej. 111999111"/>
					<Atributo titulo={"Teléfono"} nombre={"telefono"}
						tipo={"number"} contenido={this.state.telefono} 
						action={this.AtributoHandler} validatedAction={this.validatedFormHandler} mensaje="ej. 123456 "/>
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
						<img src={localStorage.getItem('path') + this.state.fotoUrl}/>
						<br/>
						<button className={Classes.BtnCambiarFoto} onClick={this.cambiarFoto}>
							<h3>Cambiar Foto</h3>
						</button>
					</div>)
				}

				<div className={Classes.Botones}>
					<button onClick={this.SubmitHandler} 
							className={(this.state.validated == true)?Classes.BtnCrear:Classes.BtnUnvalidated}>
						<h2>{(this.state.tipo == "Editar")?"Guardar":this.state.tipo}</h2>
					</button>
					<Link to ="/">
					<button className={Classes.BtnCancelar}>
						<h2>Cancelar</h2>
					</button>
					</Link>
					{(this.state.tipo == "Editar")?
					<button className={Classes.BtnEliminar} onClick={this.eliminarHandler}>
						<h2>Eliminar Cuenta</h2>
					</button>
					:null}
				</div>
			</div>
			</div>
		);
  	}

}

export default formularioUsuario;