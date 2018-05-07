import React from 'react';
import classes from './UserContact.css';
import Map from '../Map/Map';

const userContact = (props) => (
		<div className={classes.UserContact}>
			<h3>Renzo Davila Acosta</h3>
			<img  alt="Profile Pick" src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/User-blue-icon.png"/>
			<span>987654321</span>
			<p>Telefono (Opcional)</p>
			<input></input>
			<p>Mensaje</p>
			<input></input>
			<Map/>
			<button>Enviar</button>
		</div>
	);

export default userContact;