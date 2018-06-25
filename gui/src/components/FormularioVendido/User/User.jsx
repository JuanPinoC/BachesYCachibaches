import React from 'react';

import Classes from './User.css';

const user = (props) => {
	console.log(props.data);
	const data = props.data;

	return(
		<div className={Classes.Usuario} onClick={() =>{ props.action(data)}}>
			<h4>{data.nombres}</h4>
			<h5>{data.email}</h5>
		</div>		
		);	
}
export default user; 