import React, { Component } from 'react';
import classes from './portada.css';
import inicio from './img/inicio.jpg';
import nintendo from './img/nintendo.jpg';
import ipod from './img/ipod.jpg';
import celular from './img/celular.png';

class portada extends Component {
  render() {
    return (
      <div className={classes.portada}>
        <body className={classes.portadaBody}>
        <table className={classes.portadaTable}>
        <tr>
        	<td>
          		<h1 className={classes.portadaTitle}>BACHES Y CACHIBACHES</h1>
          		<h4 className={classes.portadaSubtitle}>compra y vende lo que ya no usas</h4>
          	</td>
          	<td>
          		<img src={inicio} alt={"inicio"} className={classes.portadaImginicio}/> 
          	</td>
        </tr>
        </table>
        </body>
        <p className={classes.portadaIntro}>
          Quizas te pueda interesar

          <table className={classes.portadaTable}>
	        <tr>
	        	<td className={classes.portadaTd}>
	          		<img src={nintendo} alt={"nintendo"} className={classes.portadaImgbody}/> 
	          		<p> $400 </p>
	          		<p> Nintendo switch </p>
	          	</td>
	          	<td className={classes.portadaTd}>
	          		<img src={ipod} alt={"ipod"} className={classes.portadaImgbody}/> 
	          		<p> $200 </p>
	          		<p> Ipod </p>
	          	</td>
	          	<td className={classes.portadaTd}>
	          		<img src={celular} alt={"celular"} className={classes.portadaImgbody}/> 
	          		<p> $150 </p>
	          		<p> Celular </p>
	          	</td>
	        </tr>
	       </table>
        </p>
      </div>
    );
  }
}

export default portada;