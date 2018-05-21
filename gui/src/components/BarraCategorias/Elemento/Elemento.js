import React from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Elemento.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const img = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

const elemento = (props) => (
		<NavLink to={"/categoria/"+props.img.toString().slice(0,-4)} exact >
			<li className={Classes.Elemento}>
				<td>
					<img src={img[props.img.toString()]}/>
				</td>
				<td>
					<h3>{props.nombre.toString()}</h3>
				</td>	
			</li>
        </NavLink>
)

export default elemento;