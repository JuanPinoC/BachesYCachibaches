import React from 'react';

import Logo from '../Logo/Logo';

import Estilos from './Login.css';
 
const login = () => (<div className={Estilos.Login}>
	<h1>INICIO DE SESIÓN</h1>
	<form className={Estilos.Formulario}>
		<label className={Estilos.Label}>Correo electrónico</label>
		<input className={Estilos.Input} type="text" />
		<label className={Estilos.Label}>Contraseña</label>
		<input className={Estilos.Input} type="password" />
		<a href="#">Olvidaste tu contraseña</a>
		<button className={Estilos.Button}>Iniciar sesión</button>
		<button>Resetear</button>
	</form>
	<Logo />
</div>);

export default login;