import React, { Component } from 'react';

import axios from '../../AxiosFiles/axios';

import Classes from './portada.css';

import Anuncio from '../Anuncio/Anuncio';

import SlideShow from './SlideShow/SlideShow';

class portada extends Component {

	state = {
		data: null,
		vistas: []
	}

	componentDidMount = () => {
		this.getAnuncios();
	}

	getAnuncios = () => {

		axios.get('anuncios/')
  		.then((response) => {
  			console.log("Anuncios",response);

			const data = response.data.orders;
			let vistas = [];
			
			for(let i=0,l=data.length ;i < l && i < 5 ; i++){
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

	render() {
		return(
			<div className={Classes.Portada}>
				<div className={Classes.SlideShow}>
					<SlideShow 
					imagenes={['buy.gif','sell.gif','share.gif']} 
					labels={['Baches y Cachibaches','Compra y Vende','Comparte']}/>
				</div>
				<div >
					<center>
						<div className={Classes.Titulo}>
							<h1>Anuncios Destacados</h1>
						</div>	
						<div className={Classes.Anuncios}>
							{(this.state.load)?this.state.vistas:<div></div>}
						</div>
					</center>
				</div>
			</div>
		);
	}
}

export default portada;