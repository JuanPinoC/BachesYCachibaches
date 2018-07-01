import React from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Elemento.css';

const elemento = (props) => (
		<NavLink to={"/categoria/"+props.data.name} name={props.data.name} _id={props.data._id} exact >
			<li className={Classes.Elemento} onClick={() => {props.action(props.data)}}>
				<td>
					<img src={require("../img/" + props.data.name + ".png")}/>
				</td>
				<td>
					<h3>{props.data.name}</h3>
				</td>
			</li>
        </NavLink>
)

export default elemento;