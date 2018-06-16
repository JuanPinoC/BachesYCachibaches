import React,{ Component } from 'react';

import axios from '../../AxiosFiles/axios';

import classes from './Comentarios.css';

import FormularioComentario from './FormularioComentario/FormularioComentario';
import Comentario from './Comentario/Comentario';

export default class comentarios extends Component {

	constructor (props) {
		super(props);
		
		this.state = {
			data: null,
			vistas: []
		};

		this.getComentarios = this.getComentarios.bind(this);
	}
	

	componentWillMount = () => {
		this.getComentarios();
	}

	getComentarios = () => {
		axios.get('comentarios/')
		.then(response => {
			this.setState({
				data: response.data.products
			});
			this.agregarComentarios();
		});
	}

	agregarComentarios = () => {
		const data = this.state.data;
		let vistas = [];
		for(let i=0,l=data.length;i < l; i++){
			vistas.push(
				<Comentario
					img={data[i].usuario._id}
					usuario={data[i].usuario.nombres}
					comentario={data[i].comentario}
					fecha={data[i].fecha}
				/>);
		}
		this.setState({
			vistas: vistas
		});
	}

	render(){
		return (this.state.vistas == null)?
		(
			<div className={classes.Comentarios}>
			<FormularioComentario action={this.getComentarios} />
				<br/>
				<Comentario 
						comentario={"quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"} 
						usuario={"User1"} 
						fecha={"08/01/2018"} />
				<Comentario 
						comentario={"laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"}
						usuario={"User2"}
						fecha={"20/04/2018"} />
				<Comentario
						comentario={"Hola mundo!"}
						usuario={"User3"}
						fecha={"05/06/2018"} />
			</div>
		):(
			<div className={classes.Comentarios}>
				<FormularioComentario />
				<br/>
				{this.state.vistas}
			</div>
		);
	}
}