import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Foto from './Foto/Foto';
import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioUsuario extends Component {

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Crear Usuario</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Nombres"} nombre={"nombres"} tipo={"text"} />
					<Atributo titulo={"Apellidos"} nombre={"apellidos"} tipo={"text"} />
					<Atributo titulo={"E-mail"} nombre={"email"} tipo={"email"} />
					<Atributo titulo={"Contraseña"} nombre={"password"} tipo={"password"} />
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Dirección"} nombre={"direccion"} tipo={"text"} />
					<Atributo titulo={"Puntuación"} nombre={"puntuacion"} tipo={"number"} />
					<Atributo titulo={"Celular"} nombre={"celular"} tipo={"number"} />
					<Atributo titulo={"Teléfono"} nombre={"telefono"} tipo={"number"} />
				</div>
				<div className={Classes.Parte}>
					<Atributo titulo={"Latitud"} nombre={"latitud"} tipo={"text"}/>
					<Atributo titulo={"Longitud"} nombre={"longitud"} tipo={"text"}/>
				</div>
				<Foto />
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

export default formularioUsuario;