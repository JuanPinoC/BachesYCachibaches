import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioCompra extends Component {

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Crear Compra</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Porcentaje"} nombre={"porcentaje"} tipo={"number"} />
					<Atributo titulo={"Tiempo"} nombre={"tiempo"} tipo={"number"} />
					<Atributo titulo={"´Precio"} nombre={"precio"} tipo={"number"} />
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

export default formularioCompra;