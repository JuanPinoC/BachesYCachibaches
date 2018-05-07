import React from 'react';

import Classes from './Elemento.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const img = importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

const elemento = (props) => (
		<li className={Classes.Elemento}>
			<td>
				<img src={img[props.img.toString()]}/>
			</td>
			<td>
				<h3>{props.nombre.toString()}</h3>
			</td>	
		</li>
)

export default elemento;