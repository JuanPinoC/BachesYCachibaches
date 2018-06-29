import React from 'react';

import Classes from './Valoracion.css';
import star from './star.png';
import starBlack from './blackstar.png';

const valoracion = (props) =>{ 
	var estrellas = [];
	var vacias = 5;

	for (var i = 0; i < props.val; i++) {
    	estrellas.push(<img src={starBlack} />);
    	vacias--;
	}
	while(vacias>0){
		estrellas.push(<img src={star} />);
		vacias--;
	}
	return (
		<div className={Classes.Valoracion}>
			{estrellas}
		</div>)
}
export default valoracion;