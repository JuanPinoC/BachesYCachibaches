import React, { Component } from 'react';

import axios from '../../../AxiosFiles/axios';

import classes from './FormularioComentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';

class formularioComentario extends Component {

  state = {
		anuncio:"5b062af57af17f2478603ddb",
		usuario: "5b059f41cf0a481d145eb72c",
		comentario:""
  }

	onChangeHandler = (e) => {
		this.setState({
			comentario: e.target.value
		});
	}

	SubmitHandler = (e) => {
  		e.preventDefault();
  		const data = this.state;
  		axios({
  			method: 'post',
  			url: 'comentarios/',
  			data: data,
  			config: { headers: {'Content-Type': 'multipart/form-data' }}
  		})
  		.then((response) => {
  			//handle success
  			this.setState({
  				comentario: ""
  			});
  			alert("Se añadio tu comentario!");
        this.props.action();
  		})
  		.catch((response) => {
  			//handle error
  			console.log(response);
  			alert("Error al añadir el comentario.");
  		});
  	}

  	render(){
  		return (
  				<div className={classes.FormularioComentario}>
					<center>
						<img src={imgUsuario}/>
						<textarea onChange={this.onChangeHandler} value={this.state.comentario}/>
						<button onClick={this.SubmitHandler}>Comentar</button>
					</center>
				</div>
  			);
  	}
}

export default formularioComentario;