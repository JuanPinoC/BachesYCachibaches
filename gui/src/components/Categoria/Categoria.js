import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios';

import Classes from './Categoria.css';

import BarraCategorias from '../BarraCategorias/BarraCategorias.js';
import Subcategorias from './Subcategorias/Subcategorias.js';
import Anuncio from '../Anuncio/Anuncio.js';
import Spinner from '../Spinner/Spinner';

export default class categoria extends Component{

	constructor(props) {
		super(props);
		this.state = {
			data: null,
			vistas: [],
			categoria: null
		}
		this.catSelected = this.catSelected.bind(this);
	}

	componentDidMount = () => {
  		this.agregarAnuncios();
	}

	catSelected = (cat) => {
		this.setState({
			categoria: cat
		});
	}

	agregarAnuncios = () => {
		axios.get('anuncios/',
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			console.log(response.data.orders);

			const data = response.data.orders;
			let vistas = [];
			
			for(let i=0,l=data.length ;i < l && i < 5 ; i++){
				console.log(data[i]);
				vistas.push(
					<Anuncio data={data[i]} key={i}/>
				);
			}

			this.setState({
				data: data,
				vistas: vistas,
				load: true
			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}

	verMas = () => {
		console.log("verMas");
		let vistas = this.state.vistas;
		let data = this.state.data;
		let cant = 5;

		for(let i = vistas.length; cant != 0 && i < data.length ; i++){
			console.log(data[i]);
			vistas.push(
				<Anuncio data={data[i]} key={i}/>
			);
			cant--;
		}

		this.setState({
			vistas: vistas
		});

		console.log(vistas);
	}

	render() {
		let content = (<Spinner />);
							
		if(this.state.load){
			content = (
				<div>
					<h1 className={Classes.TituloCategoria}>
						{(this.state.categoria)?this.state.categoria.name:'Categoria'}
					</h1>
					<Subcategorias data={this.state.categoria && this.state.categoria.subcategorias}/>
					<hr/>
					<div className={Classes.Publicaciones}>
						{this.state.vistas}
					</div>
					{
						(this.state.vistas.length != this.state.data.length)?
						(
							<center>
								<h3 className={Classes.VerMas} onClick={this.verMas}> 
									Ver más anuncios 
								</h3>
							</center>
						):(<center><h4>Nro. de Anuncios: {this.state.data.length}</h4></center>)
					}
				</div>);
		}
		return(
			<div className={Classes.Horizontal}>
				<div>
					<BarraCategorias className={Classes.Categorias} action={this.catSelected}/>
				</div>
				{content}
			</div>
		);
	}
}