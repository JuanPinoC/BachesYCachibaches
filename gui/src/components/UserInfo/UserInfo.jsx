import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../AxiosFiles/axios';

import Classes from './UserInfo.css';

export default class userInfo extends Component{	

	state = {
		email: "",
		foto: "",
		nombres: "",
		load: false
	}

	componentWillMount = () => {
        this.getUsuario();
	}

	getUsuario = () => {
		axios.get('usuarios/menu',{
			headers: { 
				"Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
			}
		})
		.then(response => {
			const data = response.data.usuario;
			console.log(data);
			console.log(data.foto);
			this.setState({
				email: data.email,
				foto: data.foto,
				nombres: data.nombres,
				load: true
			});

		}).catch(response => {
			console.log(response);
		});
	}

	render(){
		return (!this.state.load)?
		(
			<div></div>
		):(
			<div className={Classes.UserInfo}>
				<NavLink to='/misCompras'>
					<img src={localStorage.getItem('path') + this.state.foto} />
					<h4>{this.state.nombres}</h4>
				</NavLink>
			</div>
		);
	}
}