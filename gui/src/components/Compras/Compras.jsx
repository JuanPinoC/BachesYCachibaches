import React, { Component } from 'react';
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
		
		axios(params)
		.then(docs => {
			let compras = [];
			if (docs.data.count < 1) {
				this.setState({validado: false});
			}else {
				let data=[];
				for(let i in docs.data.compra){
					let item = docs.data.compra[i];
					if (item.anuncio === null && item.vendedor === null) {
						data.push({
								'titulo':'Este anuncio ha sido eliminado',
								'precio':0,
								'vendedor':'Este usuario ha borrado su cuenta',
								'email':'Este usuario ha borrado su cuenta'
								});
					}else if(item.anuncio === null){
						data.push({
								'titulo':'Este anuncio ha sido eliminado',
								'precio':0,
								'vendedor':item.vendedor.nombres,
								'email':item.vendedor.email
								});
					}else if(item.usuario === null){
						data.push({
								'titulo':item.anuncio.titulo,
								'precio':item.anuncio.precio,
								'vendedor':'Este usuario ha borrado su cuenta',
								'email':'Este usuario ha borrado su cuenta'
								});
					}else{
						data.push({
								'titulo':item.anuncio.titulo,
								'precio':item.anuncio.precio,
								'vendedor':item.vendedor.nombres,
								'email':item.vendedor.email
							});
					}
					compras.push(<Compra data={data[i]} />)
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
  		if (this.state.validado === false) {
			componente = <h2>Usted aún no ha comprado nada.</h2>
  		}
  		if (this.state.validado) {
  			componente = this.state.compras;
  		}
  		return (
			<div className={Classes.Compras}>
				<center><h1> Compras Realizadas </h1></center>
				<hr/>
				<div>
					<center>{componente}</center>
				</div>
			</div>
		);
  	}
}