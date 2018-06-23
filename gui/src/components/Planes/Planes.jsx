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
			fecha: Date()
		}

		this.AtributoHandler = this.AtributoHandler.bind(this);
	}

	componentWillMount = () => {
		this.getPlanes();
	}

	AtributoHandler = (value) => {
    	this.setState({ plan: value });
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
  				planes.push(<Plan data={data[i]} key={i} id={i} action={this.AtributoHandler}/>);
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
  			let redirect = <Redirect to="/" />;
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
				<div className={Classes.Opciones}>
					{this.state.planes}
				</div>
				<div className={Classes.Fomulario}>
					<div>{(this.state.plan != null)?(<h1>{this.state.plan.porcentaje}</h1>):(<div>No has seleccionado un plan</div>)}</div>
					<button onClick={this.submitHandler}><h3>Aceptar</h3></button>
				</div>
			</div>	
		);
	}
}