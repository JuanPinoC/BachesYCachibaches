import React,{ Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../AxiosFiles/axios';

import Classes from './BarraCategorias.css';
import Elemento from './Elemento/Elemento.js';

export default class barraCategorias extends Component{
	
	state = {
		data:null,
		vistas:[],
		action: this.props.action
	}

	componentWillMount = () => {
		this.agregarCategorias();
	}

	agregarCategorias = () => {
		axios.get('categorias/',
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			console.log(response);
  			const data = response.data.products;
			let vistas = [];
			for(let i=0,l=data.length ;i < l; i++){
				vistas.push(
					<Elemento 
						data={data[i]} 
						action={this.state.action}/>
				);
			}
			
			this.setState({
				data: response.data.products,
				vistas: vistas
			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}	

	render(){
		return(
			<ul className={Classes.Lista}>
			{this.state.vistas}
			</ul>
		);
	}	
}