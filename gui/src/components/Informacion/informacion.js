import React from 'react';

import Classes from './informacion.css';
import team from './team/team.js';
import analista from './images/analyst.jpg';
import jefe from './images/boss.png';
import diseño from './images/designer.png';
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
				<h3>Design</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ut nulla dicta, ab doloremque consequatur harum mollitia, ipsam minus magnam quaerat praesentium ratione, amet aperiam incidunt. Iste porro molestiae non.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={diseño}/>
				<h3>Bootstrap</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ut nulla dicta, ab doloremque consequatur harum mollitia, ipsam minus magnam quaerat praesentium ratione, amet aperiam incidunt. Iste porro molestiae non.</p>
				</div>

				<div className={Classes.contentdetailsfora}>
				<img src={programador}/>
				<h3>Support</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ut nulla dicta, ab doloremque consequatur harum mollitia, ipsam minus magnam quaerat praesentium ratione, amet aperiam incidunt. Iste porro molestiae non.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={analista}/>
				<h3>Support</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ut nulla dicta, ab doloremque consequatur harum mollitia, ipsam minus magnam quaerat praesentium ratione, amet aperiam incidunt. Iste porro molestiae non.</p>
				</div>
				<div className={Classes.contentdetailsfora}>
				<img src={test}/>
				<h3>Support</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ut nulla dicta, ab doloremque consequatur harum mollitia, ipsam minus magnam quaerat praesentium ratione, amet aperiam incidunt. Iste porro molestiae non.</p>
				</div>
				
			</div>
		</div>

	
		
	
		
	
		
	</div>

)

export default informacion;