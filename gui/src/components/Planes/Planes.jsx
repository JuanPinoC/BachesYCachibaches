import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../../AxiosFiles/axios';

import Plan from './Plan/Plan';

import Classes from './Planes.css';

export default class planes extends Component{

	constructor(props) {
		super(props);
		
		this.state ={
			anuncioId: this.props.match.params.id,
			plan: null,
			precio: 0,
			fecha: Date()
		}

		this.AtributoHandler = this.AtributoHandler.bind(this);
	}

	componentWillMount = () => {
		this.getAnuncio(this.getPlanes);
		console.log("Fecha",this.state.fecha);
	}

	AtributoHandler = (value) => {
    	this.setState({ plan: value });
	}

	getAnuncio = (cb) =>{
		axios.get('anuncios/find/?anuncioId=' + this.props.match.params.id,
			{headers: 
  				{ "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
		.then(doc=>{
			if (doc.data.anuncio.precio !== null) {
				this.setState({precio: doc.data.anuncio.precio})
				console.log("Precio",doc.data.anuncio.precio)
				return cb();
			}
		})
		.catch(err=>{
			console.log("Error getAnuncio",err);
		})
	}

	getPlanes = () => {
		let planes = [];

		axios.get('planes/',
  			{
  				headers: 
  				{ "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }
			})
  		.then((response) => {
  			const data = response.data.plan;
  			
  			for(let i = 0, l = data.length; i < l; i++){
  				planes.push(<Plan data={data[i]} key={i} id={i} action={this.AtributoHandler} precio={this.state.precio}/>);
  				if((i+1)%3 == 0){planes.push(<br/>)}
  			}

  			this.setState({
  				planes: planes
  			});

  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}



	submitHandler = () => {

  		const data = this.state;

  		let url = 'anuncios/highlight';

  		const params = {
  			method: 'post',
  			url: url,
  			data: data, 
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		}

  		axios(params)
  		.then((response) => {
  			//handle success
  			let redirect = <Redirect to="/misAnuncios" />;
  			this.setState({
  				redirect: redirect
  			});
  			console.log(response);
  		})
  		.catch((response) => {
  			//handle error
  			console.log(response);
  		});
	}

	render(){
		return(
			<div className={Classes.Planes}>
				{this.state.redirect}
				<div className={Classes.Opciones}>
					{this.state.planes}
				</div>
				<div className={Classes.Formulario}>
					<center><h1>Precio Actual del Anuncio <br/>$./ {this.state.precio}</h1></center>
					<hr/>
					<div>{(this.state.plan != null)?
						(
							<div>
								<center>
									<h1>Destaque {(parseFloat(this.state.plan.porcentaje)*100).toFixed(0)}%</h1>
									<h2>Durante {this.state.plan.tiempo} días</h2>
									<h2>Por solo $/.{(this.state.plan.precio*this.state.precio).toFixed(2)} </h2>	
								<button onClick={this.submitHandler}><h3>Aceptar</h3></button>
								</center>	
							</div>
										
						):(
							<div>
								<center>
								<h2>No has seleccionado un plan</h2>
								<button 
								className={Classes.Disabled}
								onClick={this.submitHandler} disabled><h3>Aceptar</h3></button>
								</center>
							</div>
						)}
					</div>
				</div>
			</div>	
		);
	}
}