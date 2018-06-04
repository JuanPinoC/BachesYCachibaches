import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioChangePassword extends Component {
  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Cambiar Contraseña</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Antigua Contraseña"} nombre={"contrasenia"} tipo={"text"} />
					<Atributo titulo={"Nueva contraseña"} nombre={"newpass"} tipo={"text"} />
				</div>
				<div className={Classes.Botones}>
					<button className={Classes.BtnCrear}>
						<h2>Cambiar</h2>
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

export default formularioChangePassword;