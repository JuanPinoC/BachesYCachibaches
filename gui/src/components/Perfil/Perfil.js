import React,{Component} from 'react';

import axios from '../../AxiosFiles/axios';

import Anuncio from '../Anuncio/Anuncio.js';
import Usuario from './Usuario/Usuario.js';
import Spinner from '../Spinner/Spinner';

import Classes from './Perfil.css';

export default class perfil extends Component{	

	state = {
		userId: (typeof this.props.match.params.id != 'undefined')?this.props.match.params.id:"",
		dataUsuario: null,
		vistas: [],
		load: false
	}

	componentWillMount = () => {
		if(this.state.userId != ''){
			this.getUsuario();
			this.getAnuncios();	
		}else{
			axios.get('usuarios/menu',
				{
					headers:{"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')}
				})
			.then(response => {
				const usuario = response.data.usuario;

				this.setState({
					userId: usuario._id
				});
				
				this.cargarUsuarioYAnuncios();		
			}).catch(response => {
				console.log(response);
			});
		}
	}

	cargarUsuarioYAnuncios = () => {
		this.getUsuario();
		this.getAnuncios();
	}

	getUsuario = () => {
		axios.get('usuarios/getUserById?userId=' + this.state.userId,{
			headers: { 
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		})
		.then(response => {
			const data = response.data.usuario;
			this.setState({
				dataUsuario: data
			});

		}).catch(response => {
			console.log(response);
		});
	}

	getAnuncios = () => {
		axios.get('anuncios/listById?userId=' + this.state.userId,
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			console.log(response);
			const data = response.data.result;
			let vistas = [];
			
			for(let i=0,l=data.length ;i < l && i < 5 ; i++){
				vistas.push(
					<Anuncio data={data[i]} key={i}/>
				);
			}

			this.setState({
				vistas: vistas,
				load: true
			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}

	render(){
		return (!this.state.load)?
		(
			<Spinner />
		):(
			<div className={Classes.Perfil}>
				<hr/>
				<h1 className={Classes.Titulos}>Perfil del Usuario</h1>
				<hr/>
				<Usuario data={this.state.dataUsuario} />
				<hr/>
				<h1 className={Classes.Titulos}>Anuncios</h1>
				<hr/>
				<center>
					<div className={Classes.Publicaciones}>
						{this.state.vistas}
					</div>
				</center>
			</div>
		);
	}
}