import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';

import axios from '../../AxiosFiles/axios';

import User from './User/User';
import Classes from './FormularioVendido.css';
import Spinner from '../Spinner/Spinner';

export default class formularioVendido extends Component {

	constructor(props){
		super(props);
		this.state = {
			anuncio: props.match.params.id,
			userId: '',
			userName: '',
			foto:null,
			inputText: "",
			usuarios: [],
			pulsado: false,
			cargado: null,
			cargadoAnuncio:false
		}
		this.usuarioSeleccionado = this.usuarioSeleccionado.bind(this);
	}
	
	componentWillMount = () => {
		const idAnuncio = this.props.match.params.id;

		axios.get('anuncios/find?anuncioId=' + idAnuncio,
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
		.then(doc=>{
			console.log("Anuncio",doc.data.anuncio);
			this.setState({
				tituloAnuncio: doc.data.anuncio.titulo,
				precioAnuncio: doc.data.anuncio.precio,
				cargadoAnuncio: true
			})
		})
	}

	inputChange = (e) => {
		this.setState({
			inputText: e.target.value
		});
	}

	getUsuarios = () => {
		this.setState({pulsado: true});
		const data = {
			string: this.state.inputText
		};

      	const params = {
        	method: 'post',
        	url: '/usuarios/search',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};

  		axios(params)
		.then((response) => {
			console.log("Buscar",response);
			const data = response.data.result;
			let usuarios = [];
			
			if (response.data.count < 1) {
				this.setState({cargado:false,
								pulsado:false});
			}else{
				for(let i=0,l=data.length;i < l && i < 5; i++){
					usuarios.push(
									<User data={data[i]} action={this.usuarioSeleccionado} />
								);
				}

				this.setState({
					usuarios: usuarios,
					pulsado: false,
					cargado: true
				});
			}
		})
		.catch((response) => {
			console.log(response);
		});
	}

	usuarioSeleccionado = (user) => {
		this.setState({
			userId: user._id,
			userName: user.nombres,
			foto: user.foto
		});
	}

	submitHandler = () => {
		const data = {
			anuncio: this.state.anuncio,
			userId: this.state.userId,
			fecha: Date()
		};

      	const params = {
        	method: 'post',
        	url: '/compras/',
        	data: data,
        	headers: {
        		'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
        	}
		};

  		axios(params)
		.then((response) => {
			let redirect = <Redirect to="/" />;
  			this.setState({
  				redirect: redirect
  			});

		})
		.catch((response) => {
			console.log(response);
		});
	}

  	render(){
  		let componente 
  		if (this.state.pulsado) {
  			componente = <Spinner/>
  		}
  		if (this.state.cargado && this.state.pulsado !== true) {
  			componente = this.state.usuarios;
  		}
  		if (this.state.cargado === false && this.state.pulsado !== true){
  			componente = <center><h2>Este usuario no existe.</h2></center>
  		}
  		return (
			<div className={Classes.FormularioVendido}>
				{this.state.redirect}
				<center><h1> Vendiendo Anuncio </h1>
						<hr/>
						{(this.state.cargadoAnuncio)?
						(<div>
						 <h2>{this.state.tituloAnuncio}</h2>
						 <h2>Precio $/.{this.state.precioAnuncio}</h2>
						 </div>):
						(<Spinner/>)
						}
						
						<hr/></center>
				{(this.state.userId!='')?
					(<div>
						<center>
						<h2>Usuario seleccionado: {this.state.userName}</h2>
						<div>
						<img src={localStorage.getItem('path') + this.state.foto}/>
						</div>
						<button className={Classes.BtnAceptar} onClick={this.submitHandler}>
							<h3>Aceptar</h3>
						</button>
						</center>
					</div>
					)
					:(<div></div>)}
				<h3>Seleccionar usuario comprador:</h3>
				<hr/>
				<div className={Classes.BarraBusqueda}>
					<input type='text' onChange={this.inputChange} value={this.state.inputText} />
					<button 
					className={Classes.BtnBuscar} 
					onClick={this.getUsuarios}>
					<h3>Buscar</h3></button>
					<Link to="/misAnuncios">
					<button 
					className={Classes.BtnCancelar}>
					<h3>Regresar</h3></button>
					</Link>
				</div>
				<div className={Classes.ListaUsuarios}>
					{componente}
				</div>
			</div>
		);
  	}
}
