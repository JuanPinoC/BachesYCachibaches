import React from 'react';

import Classes from './informacion.css';
import team from './team/team.js';
import analista from './images/analyst.jpg';
import jefe from './images/boss.png';
import designer from './images/designer.png';
import programador from './images/programmer.png';
import test from './images/testing.png';


const informacion = () => (
	<div className={Classes.info}>
	<br />
	<center>
       <h1>Informacion</h1>
	</center>
	<div className={Classes.contenttwo}>
			<div class={Classes.contentdetails}>

				<div className={Classes.contentdetailsfora}>
				<img src={jefe}/>
				<h3>Organizacion</h3>
				<p>Falto mucha organizacion por nuestra parte pero supimos como resolverlo mediante reuniones extra curriculares y repartiendo tareas en el grupo para que los integrantes no se estresen demasiado.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={designer}/>
				<h3>Diseño</h3>
				<p>El diseño fue respetado a los largo del desarrollo del proyecto tomando como bases diversos mockups creados al inicio del desarrollo por lo que el formato de la pagina siempre estuvo presente.</p>
				</div>

				<div className={Classes.contentdetailsfora}>
				<img src={programador}/>
				<h3>Backend</h3>
				<p>El backend fue lo primero en desarrollarse pero sufrio diversas modificacion porque mientras mas componentes creabamos en el front-end mas funciones necesitabamos en el backend.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={analista}/>
				<h3>Analisis</h3>
				<p>El analisis del proyecto se dio en base a diversos factores que determinaron cual seria la forma final de la pagina lo cual se decidio mientras el proyecto fue avanzando poco a poco.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={test}/>
				<h3>Testeo</h3>
				<p>El testeo fue una parte fundamental de nuestro proyecto, debido a que sin el no podriamos haber comprobado la correcta funcionalidad de muchos componentes.</p>
				</div>
				
			</div>
		</div>	
	</div>

)

export default informacion;