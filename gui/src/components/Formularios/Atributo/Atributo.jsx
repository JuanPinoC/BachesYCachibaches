import React, { Component } from 'react';

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
      let contenedor = 
        <input
            type={this.state.type}
            name={this.state.name}
            value={this.state.contenido}
            onChange={this.onChangeHandler} />
      if (this.state.type === "select") {
        contenedor = 
        <Select 
            name={this.state.name}
            categoria={this.props.categoria}
            subcategoria={this.props.subcategoria}
            action={this.props.action} />
      }
      if (this.state.type === "textarea") {
        contenedor=
        <textarea
          name={this.state.name}
          value={this.state.contenido}
          onChange={this.onChangeHandler}></textarea>
      }
  		return (
  			<div className={Classes.Atributo}>
          <div className={Classes.Contenedor}>
  				<label>{this.state.titulo}:</label>
  				{contenedor}
          </div>
  			</div>
		  );
  	}
}

export default atributo;