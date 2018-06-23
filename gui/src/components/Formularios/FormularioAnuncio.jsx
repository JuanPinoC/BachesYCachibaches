import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import Imagenes from './Imagenes/Imagenes';
import Atributo from './Atributo/Atributo';

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
  			console.log("ESTAS SON TUS IMAGENES: ", data.imagen );
  			this.setState({
  				tipo:'Editar',
  				_id: data._id,
				id_cat: data.categoria._id,
				nom_cat: data.categoria.nombre,
				fec_pub: data.fec_pub,
				img: data.imagen,
				precio: data.precio,
				sub_cat: data.subcategoria,
				titulo: data.titulo,
				descripcion: data.descripcion,
				usuario: data.usuario._id,
				nombres: data.usuario.nombres,
				load:true
  			});
  		})
  		.catch((response) => {
  			//handle error
  			console.log(response);
  		});		
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
  		return (!this.state.load)?(
  			<h1>Cargando...</h1>
  			):(
			<div className={Classes.Formulario}>
			<center><h1>{this.state.tipo} Anuncio</h1></center>
			<hr/>
			<div className={Classes.Form}>
				<input type='hidden' name={"userId"} value={this.state.usuario}/>
				<div className={Classes.Parte}>
					<Atributo 
						titulo={"Título"} nombre={"titulo"} 
						tipo={"text"} contenido={this.state.titulo} action={this.AtributoHandler} />
					<Atributo titulo={"Descripción"} nombre={"descripcion"}
						tipo={"text"} contenido={this.state.descripcion} action={this.AtributoHandler} />
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
				<Imagenes data={this.state.img} action={this.AtributoHandler} />
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