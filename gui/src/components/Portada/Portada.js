import React from 'react';

import Estilos from './Portada.css';
import EstilosLogin from '../Login/Login.css';

import Image from '../../assets/images/ejemplo.png';

const portada = () => (<div>
	<div className={Estilos.Derecha}>
		Derecha
		<button className={EstilosLogin.Button}>Ejemplo</button>
	</div>
	<div className={Estilos.Izquierda}>
		<img src={Image} alt="Imagen" />
	</div>
</div>);

export default portada;