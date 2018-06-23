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

      const data = this.state;
      
      const params = {
        method: 'post',
        url: '/comentarios',
        data: data,
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        }
      };

  		axios(params)
    		.then((response) => {
    			//handle success
          console.log(response);
    			this.setState({
    				comentario: ""
    			});
    			alert("Se añadio tu comentario!");
          this.props.action();
    		})
    		.catch((err) => {
    			//handle error
    			console.log("Error catch",err);
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