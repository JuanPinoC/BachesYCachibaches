import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Imagenes from './Imagenes/Imagenes';
import Atributo from './Atributo/Atributo';
import Spinner from '../Spinner/Spinner';

import img from '../Anuncio/img.jpg';

import Classes from './Formulario.css';

class formularioAnuncio extends Component {

	constructor(props) {
		super(props);
		this.state = (typeof props.match.params.id != 'undefined')?
						{
							tipo:'Editar'
						}:{
							tipo: 'Crear'
						};

		this.AtributoHandler = this.AtributoHandler.bind(this);
	}

	componentWillMount = () => {
		if(this.state.tipo === 'Editar'){
			this.getAnuncio(this.props.match.params.id);
		}else{
			this.setState({load:true})
		}
	}

	getAnuncio = (id) => {
		axios.get('anuncios/find?anuncioId=' + id,
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			const data = response.data.anuncio;

  			this.setState({
  				_id: data._id,
				id_cat: data.categoria._id,
				nom_cat: data.categoria.nombre,
				fec_pub: data.fec_pub,
				imagenUrl: data.imagen,
				imagenUrlPreviews: [],
				precio: data.precio,
				sub_cat: data.subcategoria,
				titulo: data.titulo,
				descripcion: data.descripcion,
				usuario: data.usuario._id,
				nombres: data.usuario.nombres,
				cambiarImagen: false
  			});
  			let array = [];
  			for(let i=0, l=this.state.imagenUrl.length;i < l; i++){
  				array.push(<img src={localStorage.getItem('path') + this.state.imagenUrl[i]} />);
  			}
  			this.setState({
  				imagenUrlPreviews: array,
  				load:true
  			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});		
	}

	cambiarImagen = () => {
		const oldState = this.state.cambiarImagen;

		if(oldState == true){
			this.setState({
				cambiarImagen: !oldState,
				imagen: null
			});
		}else{
			this.setState({
				cambiarImagen: !oldState
			});
		}
	}

	AtributoHandler = (campo, valor) => {
		if(campo == "precio")
    		this.setState({ precio: parseFloat(valor)});
    	else
    		this.setState({ [campo]: valor});
  	}

  	SubmitHandler = (e) => {

  		let imgs = [];
  		const data = this.state;
  		const files = this.state.imagen || [];

  		const formData = new FormData();
  		formData.append("_id",this.state._id);
  		formData.append("titulo",this.state.titulo);
  		formData.append("descripcion",this.state.descripcion);
  		formData.append("precio",this.state.precio);
  		formData.append("categoria",this.state.categoria);
  		formData.append("subcategoria",this.state.subcategoria);

  		for(let i=0, l=files.length; i < l; i++){
  			imgs.push(files[i].file);
  		}
  		for(let i=0, l=imgs.length; i < l; i++){
  			formData.append("imagen",imgs[i],imgs[i].name);
  		}
  		  		
  		let url = 'anuncios/';

  		if(this.state.tipo == 'Editar'){
  			url = url + 'update';
  		}

  		const params = {
  			method: 'post',
  			url: url,
  			data: formData, 
			headers: { 
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		}

  		axios(params)
  		.then((response) => {
  			//handle success
  			let redirect = <Redirect to="/" />;
  			this.setState({
  				redirect: redirect
  			});
  		})
  		.catch((response) => {
  			//handle error
  			console.log(response);
  		});
  	}

	textareaHandler = (e) => {
		this.setState({descripcion:e.target.value});
	}

  	render(){
  		return (!this.state.load)?(
  			<Spinner />
  			):(
			<div className={Classes.Formulario}>
			{this.state.redirect}
			<center><h1>{this.state.tipo} Anuncio</h1></center>
			<hr/>
			<div className={Classes.Form}>
				<input type='hidden' name={"userId"} value={this.state.usuario}/>
				<div className={Classes.Parte}>
					<Atributo 
						titulo={"Título"} nombre={"titulo"} 
						tipo={"text"} contenido={this.state.titulo} action={this.AtributoHandler} />
					<Atributo titulo={"Descripción"} nombre={"descripcion"}
						tipo={"textarea"} contenido={this.state.descripcion} action={this.AtributoHandler} />
					<Atributo titulo={"Precio"} nombre={"precio"}
						tipo={"number"} contenido={this.state.precio} action={this.AtributoHandler}/>
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Categoría"} nombre={"categoria"}
        				tipo={"select"} 
        				categoria={this.state.id_cat}
        				subcategoria={this.state.sub_cat} 
        				action={this.AtributoHandler}/>
				</div>
				<br/>
				<br/>
				{(	(this.state.tipo == "Crear") ||
					(this.state.tipo == "Editar" && this.state.cambiarImagen))?
					(
					<div>
						<Imagenes action={this.AtributoHandler}/>
						{(this.state.tipo == "Editar")?
							(<button className={Classes.BtnFotoCancel} onClick={this.cambiarImagen}>
								<h3>Cancelar</h3>
							</button>):(<br/>)}
					</div>
					):
					(
					<div className={Classes.ImagenesEditar}>
						<div>
						{this.state.imagenUrlPreviews}
						</div>
						<br/>
						<button className={Classes.BtnCambiarFoto} onClick={this.cambiarImagen}>
							<h3>Cambiar Imagenes</h3>
						</button>
					</div>)
				}
				<div className={Classes.Botones}>
					<button type='submit' className={Classes.BtnCrear} onClick={this.SubmitHandler}>
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

export default formularioAnuncio;