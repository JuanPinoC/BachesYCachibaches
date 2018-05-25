import React from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './FormularioAnuncio.css';

const formularioAnuncio = (props) => (
	<div className={Classes.FormularioAnuncio}>
		<center><h1>Crear Anuncio</h1></center>
		<hr/>
		<form method='POST' >
			<div className={Classes.Parte}>
				<div className={Classes.Atributo}>
					<label>Título:</label> <input  type="text" name='titulo'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Descripción:</label><input  type="text" vname='descripcion'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Usuario:</label><input  type="text" name='usuario'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Activo:</label><input  type="text" name='activo'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Fecha publicación:</label><input  type="date" name='fec_pub'/>
				</div>	
			</div>
			<div className={Classes.Parte}>
				<div className={Classes.Atributo}>
					<label>Categoria:</label><input  type="text" name='categoria'/>
				</div>
				<div className={Classes.Atributo}>
					<label>SubCategoria:</label><input  type="text" name='sub_cat'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Precio:</label><input  type="number" name='precio'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Destacado:</label><input  type="text" name='destacado'/>
				</div>
				<div className={Classes.Atributo}>
					<label>Imagen:</label><input  type="file" name='imagen'/>
				</div>
			</div>
			<div className={Classes.Botones}>
				<button className={Classes.BtnCrear}><h2>Crear</h2></button>
				<button className={Classes.BtnCancelar}><h2>Cancelar</h2></button>
			</div>
		</form>
	</div>
)

export default formularioAnuncio;