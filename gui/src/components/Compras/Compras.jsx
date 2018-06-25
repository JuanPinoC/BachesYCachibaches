import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Compra from './Compra/Compra';
import axios from '../../AxiosFiles/axios';

import Classes from './Compras.css';

export default class compras extends Component {

	state = {
		inputText: "",
		compras: []
	}

	componentWillMount = () => {
		const params = {
        	method: 'get',
        	url: '/compras/getByToken',

        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};
		let compras = [];
		axios(params)
		.then(docs => {
			let data = docs.data.compra;
			for(let i=0,l=data.length;i < l; i++){
				compras.push(
					<Compra data={data[i]} />
					)
			}

			this.setState({compras: compras});
		})
		.catch(err => {
			console.log(err);
		});

	}

  	render(){
  		return (
			<div className={Classes.FormularioVendido}>
			<center><h1> Anuncios Vendidos </h1></center>
			<hr/>
			<div>
				{this.state.compras}
			</div>
			</div>
		);
  	}
}