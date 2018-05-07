import React from 'react';

import Classes from './Subcategorias.css';

const subcategorias = () => (
		<ul className={Classes.Subcategorias}>
			<li className={Classes.Subcategoria}><a>Subcategoria 1</a></li>
			<li className={Classes.Subcategoria}><a>Subcategoria 2</a></li>
			<li className={Classes.Subcategoria}><a>Subcategoria 3</a></li>
			<li className={Classes.Subcategoria}><a>Subcategoria 4</a></li>
		</ul>
)

export default subcategorias;