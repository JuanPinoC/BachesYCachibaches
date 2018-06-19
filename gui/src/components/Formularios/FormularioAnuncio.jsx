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
				destacado: props.data.destacado
			}:{};

		this.AtributoHandler = this.AtributoHandler.bind(this);
	}

	AtributoHandler = (campo, valor) => {
		if(campo == "precio")
    		this.setState({ precio: parseFloat(valor)});
    	else
    		this.setState({ [campo]: valor});
  	}

  	SubmitHandler = (e) => {
  		let imgs = [];
  		let data = this.state.imagen;
  		
  		for(let i=0, l=data.length; i < l; i++){
  			imgs.push(data[i].file);
  		}

  		const formData = new FormData();
  		formData.append("titulo",this.state.titulo);
  		formData.append("descripcion",this.state.descripcion);
  		formData.append("precio",this.state.precio);
  		formData.append("categoria",this.state.categoria);
  		formData.append("subcategoria",this.state.subcategoria);

  		for(let i=0, l=imgs.length; i < l; i++){
  			formData.append("imagen",imgs[i],imgs[i].name);
  		}
  		
  		const params = {
  			method: 'post',
  			url: 'anuncios/',
  			data: formData, 
			headers: { 
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		}

  		axios(params)
  		.then((response) => {
  			//handle success
  			console.log(response);
  		})
  		.catch((response) => {
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
				<Imagenes action={this.AtributoHandler} />
				<div className={Classes.Botones}>
					<button type='submit' className={Classes.BtnCrear} onClick={this.SubmitHandler}>
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