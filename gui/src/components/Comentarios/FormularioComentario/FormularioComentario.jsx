import React, { Component } from 'react';

import axios from '../../../AxiosFiles/axios';

import classes from './FormularioComentario.css';

import imgUsuario from '../../Perfil/Usuario/userExample.png';

class formularioComentario extends Component {

  state = {
		anuncio: this.props.anuncioId,
		comentario: "",
    foto:'',
    validated: false
  }

  componentWillMount = () => {
    axios.get('usuarios/menu',{
      headers: { 
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    })
    .then(response => {
      const data = response.data.usuario;
      console.log(data);

      this.setState({
        foto: data.foto,
        load:true
      });

    }).catch(response => {
      console.log(response);
    });
  }

	onChangeHandler = (e) => {
		this.setState({
			comentario: e.target.value
		});
    this.validateComment(e.target.value);
	}

  validateComment = (comment) => {
    const expression  = new RegExp("^[a-zA-Z0-9!?.-]{5,250}$");

    if(expression.test(comment)) {
      this.setState({validated: true});
    } else{
      this.setState({validated: false});
    }
  }

	SubmitHandler = (e) => {
      
      if(this.state.validated == false) return;

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
          this.setState({validated: false});
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
						<img src={localStorage.getItem('path') + this.state.foto}/>
						<textarea onChange={this.onChangeHandler} value={this.state.comentario}/>
						<button onClick={this.SubmitHandler} 
                    className={(this.state.validated == true)?classes.Btn:classes.BtnUnvalidated}>
            <h3>Comentar</h3></button>
					</center>
				</div>
  			);
  	}
}

export default formularioComentario;