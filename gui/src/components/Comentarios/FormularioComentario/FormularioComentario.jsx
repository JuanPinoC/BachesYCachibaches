import React, { Component } from 'react';

import axios from '../../../AxiosFiles/axios';

import classes from './FormularioComentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';

class formularioComentario extends Component {

  state = {
		anuncio: this.props.anuncioId,
		comentario: ""
  }

	onChangeHandler = (e) => {
		this.setState({
			comentario: e.target.value
		});
	}

	SubmitHandler = (e) => {
  		e.preventDefault();
  		const data = this.state;
      console.log(data);
      const formData = new FormData();
      formData.append("anuncio",data.anuncio);
      formData.append("comentario",data.comentario);

  		axios({
  			method: 'post',
  			url: 'comentarios/',
  			data: formData,
  			headers: { 
          'Content-Type': 'text/html',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        }
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
						<button onClick={this.SubmitHandler}><h3>Comentar</h3></button>
					</center>
				</div>
  			);
  	}
}

export default formularioComentario;