import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioComentario extends Component {

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Crear Comentario</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Anuncio"} nombre={"anuncio"} tipo={"text"} />
					<Atributo titulo={"Fecha"} nombre={"fecha"} tipo={"date"} />
					<Atributo titulo={"Usuario"} nombre={"usuario"} tipo={"text"} />
					<Atributo titulo={"Comentario"} nombre={"comentario"} tipo={"text"} />
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

export default formularioComentario;