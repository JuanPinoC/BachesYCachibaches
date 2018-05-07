import React from 'react';
import classes from './SideMenu.css';
import Icon from './Icon/Icon';

const sideMenu = (props) =>{ 
	const categories = [
		{name: 'Animales',key:1},
		{name: 'Hogar',key:2},
		{name: 'Inmobiliario',key:3},
		{name: 'Libros',key:4},
		{name: 'Ropa',key:5},
		{name: 'Musica',key:6},
		{name: 'Servicios',key:7},
		{name: 'Tecnologia',key:8},
		{name: 'Vehiculos',key:9}
	];

	return (
		<div className={classes.SideMenu}>
			{categories.map(cat => (
				<Icon
				key={cat.key} 
				category={cat.name}/>
				))}
		</div>
	);
}

export default sideMenu;