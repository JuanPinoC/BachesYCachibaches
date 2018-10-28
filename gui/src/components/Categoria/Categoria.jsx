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
			categoria: null,
			inputText:(typeof this.props.match.params.string != 'undefined')?this.props.match.params.string:""
		}
		this.catSelected = this.catSelected.bind(this);
		this.subcatSelected = this.subcatSelected.bind(this);
	}

	componentDidMount = () => {
		if(this.state.inputText != ""){
			this.buscarInput();
		}else{
			this.agregarAnuncios();
		}
	}

	catSelected = (cat) => {
		this.setState({
			data:[],
			vistas:[],
			categoria: cat
		});
		this.agregarAnuncios('categoria',cat._id);		
	}

	subcatSelected = (subcat) => {
		this.setState({
			data:[],
			vistas:[]
		});
		this.agregarAnuncios('subcategoria',subcat);	
	}

	agregarAnuncios = (selected,id) => {
		let url = 'anuncios/';
		if(selected == 'categoria'){
			url = 'anuncios/categoria?categoriaId='+id;
		}else if(selected == 'subcategoria'){
			url = 'anuncios/subcategoria?subcategoria='+id;
		}

		axios.get(url,
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
	}

	inputHandler = (e) => {
		this.setState({
			inputText: e.target.value
		});
	}

	buscarInput = (e) => {

		this.setState({
			vistas: [],
			categoria: null
		});
		
		const data = {
			string: this.state.inputText
		}

		const params = {
        	method: 'post',
        	url: 'anuncios/search',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};
		console.log(params);

		axios(params)
  		.then((response) => {
  			console.log(response);

			const data = response.data.result;
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

	onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter') {
        this.buscarInput();
      }
    }

	render() {
		let content = (<Spinner />);
							
		if(this.state.load){
			content = (
				<div>
					<div className={Classes.BarraBusqueda}>
							<input value={this.state.inputText} onKeyDown={this.onKeyDown} onChange={this.inputHandler}/>
							<button className={Classes.BtnBuscar} onClick={this.buscarInput}><h3>Buscar</h3></button>
							<h1 className={Classes.TituloCategoria}>
								{(this.state.categoria)?this.state.categoria.name:'Anuncios'}
							</h1>
					</div>
					<Subcategorias 
						data={this.state.categoria && this.state.categoria.subcategorias}
						action={this.subcatSelected}
						/>
					<hr/>
					<center>
					<div className={Classes.Publicaciones}>
						{this.state.vistas}
					</div>
					</center>
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
				<div className={Classes.BarraCategorias}>
					<BarraCategorias className={Classes.Categorias} action={this.catSelected}/>
				</div>
				<div className={Classes.Content}> 
					{content}
				</div>
			</div>
		);
	}
}