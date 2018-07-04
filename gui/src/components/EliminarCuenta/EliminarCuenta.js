import React,{Component} from 'react';
import axios from '../../AxiosFiles/axios';
import classes from './EliminarCuenta.css';

class EliminarCuenta extends Component {

	deleteAccountHandler = () => {
	const params = {
        	method: 'post',
        	url: '/usuarios/delete',
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
        }
  		axios(params)
  		.then(response => {
  			sessionStorage.removeItem('jwtToken');
  			window.location.replace(localStorage.getItem('path'));
  		})
  		.catch(err => {
			console.log("Error",err);
  		})
	}
	render(){
		return(
			<div className={classes.EliminarCuenta}>
				<h2>¿Estas seguro que deseas borrar tu cuenta?</h2>
				<p>Nota: Al borrar tu cuenta todos tus comentarios y anuncios tambien seran borrados.</p>
				<button className={classes.BtnCrear} onClick={this.deleteAccountHandler}>Si</button>
				<button className={classes.BtnCancelar} onClick={this.props.closed}>No</button>
			</div>
		);
	}
}

export default EliminarCuenta;