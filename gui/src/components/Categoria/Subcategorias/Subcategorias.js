import React from 'react';

import Classes from './Subcategorias.css';

const subcategorias = (props) => {
	let elementos = [];
	if(props.data!=null){
		for(let i=0,l=props.data.length;i < l;i++){
			elementos.push(<li className={Classes.Subcategoria}><a>{props.data[i].nombre}</a></li>);
		}
	}

	return(
		<ul className={Classes.Subcategorias}>
			{elementos}
		</ul>
	);
}

export default subcategorias;