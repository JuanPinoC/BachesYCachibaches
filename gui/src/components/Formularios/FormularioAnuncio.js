import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Imagenes from './Imagenes/Imagenes';
import Atributo from './Atributo/Atributo';

import Classes from './Formulario.css';

class formularioAnuncio extends Component {

  	render(){
  		return (
			<div className={Classes.Formulario}>
			<center><h1>Crear Anuncio</h1></center>
			<hr/>
			<form method='POST'>
				<div className={Classes.Parte}>
					<Atributo titulo={"Título"} nombre={"titulo"} tipo={"text"} />
					<Atributo titulo={"Descripción"} nombre={"descripcion"} tipo={"text"} />
					<Atributo titulo={"Usuario"} nombre={"usuario"} tipo={"text"} />
					<Atributo titulo={"Activo"} nombre={"activo"} tipo={"text"} />
					<Atributo titulo={"Fecha publicación"} nombre={"fec_pub"} tipo={"date"} />
				</div>
        		<div className={Classes.Parte}>
        			<Atributo titulo={"Categoria"} nombre={"categoria"} tipo={"text"} />
					<Atributo titulo={"Subcategoria"} nombre={"sub_cat"} tipo={"text"} />
					<Atributo titulo={"Precio"} nombre={"precio"} tipo={"number"} />
					<Atributo titulo={"Destacado"} nombre={"destacado"} tipo={"text"} />
				</div>
				<Imagenes />
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

export default formularioAnuncio;