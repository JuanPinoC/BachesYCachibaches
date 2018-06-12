import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Imagenes from './Imagenes/Imagenes';
import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioAnuncio extends Component {

	constructor(props) {
		super(props);
		this.state = (props.data)?
			{
				tipo: props.data.tipo,
				titulo: props.data.titulo,
				descripcion: props.data.descripcion,
				precio: props.data.precio,
				categoria: props.data.categoria,
				subcategoria: props.data.subcategoria,
				destacado: props.data.destacado,
				usuario: "5b09a556220ed019884c25cc"
			}:{
				usuario: "5b09a556220ed019884c25cc"
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
  			url: 'anuncios/',
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
			<center><h1>Crear Anuncio</h1></center>
			<hr/>
			<div className={Classes.Form}>
				<input type='hidden' name={"userId"} value={this.state.usuario}/>
				<div className={Classes.Parte}>
					<Atributo titulo={"Título"} nombre={"titulo"} 
						tipo={"text"} contenido={this.state.titulo} action={this.AtributoHandler} />
					<Atributo titulo={"Descripción"} nombre={"descripcion"}
						tipo={"text"} contenido={this.state.descripcion} action={this.AtributoHandler} />
					<Atributo titulo={"Precio"} nombre={"precio"}
						tipo={"number"} contenido={this.state.precio} action={this.AtributoHandler}/>
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Categoría"} nombre={"categoria"}
        				tipo={"select"} contenido={this.state.categoria} action={this.AtributoHandler}/>
				</div>
				<Imagenes />
				<div className={Classes.Botones}>
					<button type='submit' className={Classes.BtnCrear}>
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

export default formularioAnuncio;