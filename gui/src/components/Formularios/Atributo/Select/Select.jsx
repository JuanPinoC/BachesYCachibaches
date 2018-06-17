import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import axios from '../../../../AxiosFiles/axios';

import Classes from './Select.css';

class categoriaSelect extends Component {

	state = {
		name: this.props.nombre,
		contenido: this.props.contenido,
		contenido_subcat: this.props.contenido_subcat,
		data: [],
		categorias: [],
		subcats: []
	}

	componentWillMount = () => {
		axios.get('categorias/').then(response => {
			let categorias = this.state.categorias,
			data = response.data.products;
			
			for(let i=0;i< data.length; i++){
				categorias.push(<option value={data[i]._id}>{data[i].name}</option>);
			}

			this.setState({
				contenido: data[0]._id,
				data: data,
				categorias: categorias
			});
			this.cargarSubcats();
		});
	}

	cargarSubcats = () => {
		let subcategorias = [];
		let data = this.state.data;
		let selected;

		for(let i=0; i < data.length; i++){
			if(this.state.contenido == data[i]._id){
				selected = data[i].subcategorias[0]._id;
				for(let j=0; j < data[i].subcategorias.length; j++){
					subcategorias.push(
						<option value={data[i].subcategorias[j]._id}>
							{data[i].subcategorias[j].nombre}
						</option>
					);
				}
				break;
			}
		}

		this.setState({
			subcats: subcategorias,
			contenido_subcat: selected
		});

		this.updatePadre();
	}

	onChangeHandler = (e) => {
		this.setState({
			contenido: e.target.value
		});
		this.cargarSubcats();
	}

	subcatChangeHandler = (e) => {
		this.setState({
			contenido_subcat: e.target.value
		});
		this.updatePadre();
	}

	updatePadre = () => {
		if(this.props.action){
			this.props.action('categoria',this.state.contenido);
			this.props.action('subcategoria',this.state.contenido_subcat);
		}
	}

  	render(){
  		return(
  			<div className={Classes.SelectCategorias}>
  			<select className={Classes.Select} 
  				name={"categoria"}
  				value={this.state.contenido} 
  				onClick={this.onChangeHandler} onChange={this.onChangeHandler}>
  				{this.state.categorias}
  			</select>
  			<br/>
  			<label>Subcategoría:</label>
  			<br/>
  			<select className={Classes.Select} 
  				name={"subcategoria"} 
  				value={this.state.contenido_subcat}
  				onClick={this.subcatChangeHandler} onChange={this.subcatChangeHandler}>
  				{this.state.subcats}
  			</select>
  			</div>
  		)
  	}
}

export default categoriaSelect;