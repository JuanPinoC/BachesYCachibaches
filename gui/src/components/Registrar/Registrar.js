import React from 'react';
import Estilos from './Registrar.css';
import Facebook from './img/facebook.png';
import Google from './img/google.png';

const registrar = () => (
	<div>
	<h1>REGISTRARSE</h1>
	<hr/>
	<form>
	<center>
		<p>
		<button className={Estilos.Opciones}><img src={Facebook}/>Ingresar con Facebook</button>
		<button className={Estilos.Opciones}><img src={Google}/>Ingresar con Google</button>
		</p>
		<ul className={Estilos.Formulario}>
		<li><label  ><h4>Nombre:</h4></label></li>
		<li><label ><h4>Apellidos: </h4></label></li>
		<li><label ><h4>E-mail:</h4></label></li>
		<li><label ><h4>Telefono:</h4></label></li>
		<li><label ><h4>Direccion:</h4></label></li>
		<li><label ><h4>Descripcion:</h4></label></li>
		<li><label ><h4>Contraseña:</h4></label></li>
		<li><label ><h4>Confirmar Contraseña:</h4></label></li>
		</ul>
		<ul className={Estilos.Formulario}>
		<li><input className={Estilos.Bordes} type="text" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="text" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="text" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="text" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="text" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="text" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="password" /></li>
		<p></p>
		<li><input className={Estilos.Bordes} type="password" /></li>
		</ul>
		<p></p>
		<label><input type="radio" value="option1" />Acepto los terminos y condiciones.</label>
		<p></p>
		<button className={Estilos.Registrar}><h4>REGISTRAR</h4></button>
		</center>
		
	</form>
	</div>);

export default registrar;