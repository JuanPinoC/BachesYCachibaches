import React,{ Component } from 'react';

import axios from '../../AxiosFiles/axios';

import Classes from './Comentarios.css';

import FormularioComentario from './FormularioComentario/FormularioComentario';
import Comentario from './Comentario/Comentario';
import Spinner from '../Spinner/Spinner';

export default class comentarios extends Component {

	constructor (props){
		super(props);
		
		this.state = {
			anuncioId: props.anuncioId,
			data: null,
			vistas: []
		};

		this.agregarComentarios = this.agregarComentarios.bind(this);
	}

	componentDidMount = () => {
		this.agregarComentarios();
	}

	agregarComentarios = () => {
		axios.get('comentarios/')
		.then((response) => {

			const data = response.data.products;
			let vistas = [];

			for(let i=0,l=data.length;i < l && i < 5; i++){
				vistas.push(<Comentario data={data[i]} key={i} />);
			}

			this.setState({
				data: data,
				vistas: vistas,
				load:true
			});
		})
		.catch((response) => {
			console.log(response);
		})
	}

	verMas = () => {
		let vistas = this.state.vistas;
		let data = this.state.data;
		let cant = 5;

		for(let i = vistas.length; cant != 0 && i < data.length ; i++){
			vistas.push(<Comentario data={data[i]} key={i}/>);
			cant--;
		}

		this.setState({
			vistas: vistas
		});
	}

	render(){
		let comentarios = (<Spinner />);
		if(this.state.load)comentarios = this.state.vistas;

		return(
			<div className={Classes.Comentarios}>
				<FormularioComentario 
					anuncioId={this.state.anuncioId} 
					action={this.agregarComentarios} />
				<br/>
				<div className={Classes.ListaComentarios}>
					{comentarios}
				</div>
				<br/>
				<center>
				{(this.state.load && this.state.vistas.length != this.state.data.length)?
					(<button className={Classes.VerMas} onClick={this.verMas}>
						<h3>Ver más</h3>
					</button>):
					(<h4>No hay más comentarios</h4>)
				}
				</center>
			</div>
		);
	}
}