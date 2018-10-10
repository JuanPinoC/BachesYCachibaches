import React, { Component } from 'react';

import Select from './Select/Select';

import Classes from './Atributo.css';

import {getRules} from './Rules/Rules';

class atributo extends Component {

	constructor(props){
		super(props);
		this.state = {
				titulo: props.titulo,
				name: props.nombre,
				type: props.tipo,
				contenido: (props.contenido)?props.contenido:"",
				mensaje: (props.mensaje)?props.mensaje:"",
				rules: getRules(props.nombre, props.tipo),
				validated: false
		}
	}

	validate = (contenido) => {
		const rules = this.state.rules;
		const evaluable = rules.evaluable;
		const expression  = new RegExp(rules.pattern);

		/*
		Rules structure:
			-evaluable
			-pattern
		*/

		if(	
			expression.test(contenido) || !rules.evaluable) {
			this.setState({validated: true});
			if(this.props.validatedAction)this.props.validatedAction(this.state.name,true);
		} else{
			this.setState({validated: false});
			if(this.props.validatedAction)this.props.validatedAction(this.state.name,false);
		}
	}

	onChangeHandler = (e) => {

		this.setState({
			contenido: e.target.value
		});

		if(this.props.action)this.props.action(this.state.name,e.target.value);

		this.validate(e.target.value);
	}

	render(){
		let validationStyle = (this.state.validated === false)?Classes.Invalid:Classes.Valid;
		let mensajeStyle = (this.state.validated != true)?Classes.Message:Classes.HiddenMessage;

		let contenedor =
					<input
						type={this.state.type}
						name={this.state.name}
						value={this.state.contenido}
						onChange={this.onChangeHandler}/>
				
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
				{(this.state.validated != true)?<b></b>:<b></b>}
				<b className={mensajeStyle}>{this.state.mensaje}</b>
				<div className={Classes.Contenedor, validationStyle}>
					<label>{this.state.titulo}:</label>
						{contenedor}
				</div>
			</div>
		);
	}
}

export default atributo;