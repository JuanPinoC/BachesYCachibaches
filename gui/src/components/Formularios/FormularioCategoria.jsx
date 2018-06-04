import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioCategoria extends Component {
	
	state = {
		subcatsNombres: [],
		subcatsVistas: []
	}

	addSubcatHandler = () => {
		let nombre = Math.random();
		let nombres = this.state.subcatsNombres;
		let vistas = this.state.subcatsVistas;

		nombres.push(nombre);
		vistas.push(
				<div>
					<Atributo 
						titulo={"Subcategoria"} 
						nombre={nombre} 
						tipo={"text"}
					/>
					<button 
						className={Classes.BtnCancelar}
						id={nombre}
						onClick={this.removeSubCatHandler}
						type='button'
						>Eliminar</button>
				</div>
		);

		this.setState({
			subcatsNombres: nombres,
			subcatsVistas: vistas 
		});
	}

	removeSubCatHandler = (e) => {
		let nombres = this.state.subcatsNombres;
		let vistas = this.state.subcatsVistas;

		let indice = nombres.indexOf(
				nombres.find((element) => {
					return element == e.target.id; 
				})
			);
		
		nombres.splice(indice,1);
    	vistas.splice(indice,1);

		this.setState({
			subcatsNombres: nombres,
			subcatsVistas: vistas 
		});
	}

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Crear Categoria</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Nombre"} nombre={"nombre"} tipo={"text"} />
					<div>{this.state.subcatsVistas}</div>
				</div>
				<div className={Classes.Parte}>
					<div className={Classes.Botones}>
					<button type='button' className={Classes.BtnCrear} onClick={this.addSubcatHandler}>
						<h2>Agregar Subcategoria</h2>
					</button>
				</div>
				</div>
				<div className={Classes.Botones}>
					<button className={Classes.BtnCrear}>
						<h2>Crear</h2>
					</button>
					<button className={Classes.BtnCancelar}>
						<h2>Cancelar</h2>
					</button>
				</div>
			</form>
			</div>
		);
  	}

}

export default formularioCategoria;