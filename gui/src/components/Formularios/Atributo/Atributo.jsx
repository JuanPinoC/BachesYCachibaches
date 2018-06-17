import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Select from './Select/Select';

import Classes from './Atributo.css';

class atributo extends Component {

  constructor(props){
    super(props);
    this.state = {
      titulo: props.titulo,
      name: props.nombre,
      type: props.tipo,
      contenido: props.contenido
    }
  }

	onChangeHandler = (e) => {
		this.setState({
			contenido: e.target.value
		});
    if(this.props.action)this.props.action(this.state.name,e.target.value);
	}

  	render(){
  		return (
  			<div className={Classes.Atributo}>
  				<label>{this.state.titulo}:</label>
  				{(this.state.type == "select")?
  				(<Select 
  					name={this.state.name}
  					contenido={this.state.contenido}
            action={this.props.action} />):
  				(<input
  					type={this.state.type}
  					name={this.state.name}
  					value={this.state.contenido}
  					onChange={this.onChangeHandler} />)}
  			</div>
		  );
  	}
}

export default atributo;