import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Atributo.css';

class atributo extends Component {
	
	state = {
		titulo: this.props.titulo,
		name: this.props.nombre,
		type: this.props.tipo
	}

  	render(){
  		return (
  			<div className={Classes.Atributo}>
  				<label>{this.state.titulo}:</label>
  				<input  type={this.state.type} name={this.state.name}/>
  			</div>
		);
  	}
}

export default atributo;