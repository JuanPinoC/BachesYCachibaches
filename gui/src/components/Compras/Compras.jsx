import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Compra from './Compra/Compra';
import axios from '../../AxiosFiles/axios';
import Spinner from '../Spinner/Spinner';

import Classes from './Compras.css';

export default class compras extends Component {

	state = {
		inputText: "",
		compras: [],
		validado: null
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
			console.log("Compras",docs);
			if (docs.length < 1) {
				this.setState({validado: false});
			}else {
				let data = docs.data.compra;
				for(let i=0,l=data.length;i < l; i++){
					compras.push(
						<Compra data={data[i]} />
						)
				}

				this.setState({compras: compras,
								validado: true});
			}
		})
		.catch(err => {
			console.log(err);
		});

	}

  	render(){
  		let componente = <Spinner/>;
  		if (this.state.compras === [] && this.state.validado !== false) {
			componente = <h1>Usted aún no tiene ninguna compra.</h1>
  		}
  		if (this.state.compras.length > 1 && this.state.validado !== false) {
  			componente = this.state.compras;
  		}
  		return (
			<div className={Classes.Compras}>
				<center><h1> Compras Realizadas </h1></center>
				<hr/>
				<div className={Classes.ListaCompras}>
					{componente}
				</div>
			</div>
		);
  	}
}