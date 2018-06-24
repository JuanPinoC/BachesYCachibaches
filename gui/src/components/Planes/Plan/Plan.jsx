import React from 'react';

import Classes from './Plan.css';

const plan = (props) => {
	console.log(props.data);
	const data = props.data;
	let estilo;

	switch (parseFloat(data.porcentaje)*100) {
		case 25: estilo = Classes.Plan25;break;
		case 50: estilo = Classes.Plan50;break;
		case 75: estilo = Classes.Plan75;break;
		case 100: estilo = Classes.Plan100;break;
	}

	return(
		<div className={estilo} onClick={() =>{ props.action(data)}}>
			
			<h2>{parseFloat(data.porcentaje)*100}%</h2>
			<p>Tiempo:{data.tiempo}</p>
			<p>Precio:{(parseFloat(data.precio)*100).toFixed(0)}% </p>
		</div>			
		);	
}
export default plan; 