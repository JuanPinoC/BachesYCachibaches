import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioSubcategoria extends Component {

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Crear Categoria</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Nombre"} nombre={"nombre"} tipo={"text"} />
					<Atributo titulo={"Categoria"} nombre={"categoria"} tipo={"text"} />
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

export default formularioSubcategoria;