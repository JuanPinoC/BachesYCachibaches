import React,{Component} from 'react';
import axios from '../../AxiosFiles/axios';
import classes from './EliminarAnuncio.css';

class EliminarAnuncio extends Component{
	
	eliminarHandler = () => {
		const data = {
			anuncioId: this.props.anuncioId
		}

		const params = {
        	method: 'post',
        	url: '/anuncios/delete',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};
		axios(params)
		.then(doc=>{
			if (doc.status === 200) {
				window.location.reload()
			}
		})
		.catch(err=>{
			console.log('Error',err);
		})
	}

	render(){
	return(
	<div className={classes.EliminarAnuncio}>
		<h2>¿Seguro que deseas eliminar este anuncio?</h2>
		<button className={classes.BtnCrear} onClick={this.eliminarHandler}>Si</button>
		<button className={classes.BtnCancelar} onClick={this.props.closed}>No</button>
	</div>
	);
	}
}

export default EliminarAnuncio;