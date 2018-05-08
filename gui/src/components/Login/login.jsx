import React, { Component } from 'react';
import classes from './login.css';
import inicio from './img/inicio.jpg';
import facebook from './img/facebook.png';
import google from './img/google.png';
import face from './img/facebookWhite.png';
import goog from './img/googleWhite.png';
import git from './img/gitWhite.png';
import inst from './img/instWhite.png';

class Login extends Component {
  render() {
    return (
      <div className={classes.login}>
        <body className={classes.loginBody}>
          <form>
            <h1 className={classes.loginTitle}>INICIO DE SESION</h1>
                <p className={classes.loginSubtitle}>Correo Electronico 
                  <p className={classes.loginSubinput}><input className={classes.loginInput} type="text" placeholder="Ingrese su correo electronico" autoFocus/></p>
                </p>
                <p className={classes.loginSubtitle2}>Contraseña
                  <p className={classes.loginSubinput}><input className={classes.loginInput} type="password" placeholder="Ingrese su contraseña" autoFocus/></p>
                </p>
                <p className={classes.loginSubtitle3}>
                <p className={classes.loginCheckinput}><input className={classes.loginSubcheckinput} type="checkbox"/>Recuerdame</p><p className={classes.loginOlvidaste}>¿Olvidaste tu contraseña?</p>
                </p>
                <img src={facebook} alt={"facebook"} className={classes.loginImgbody}/><img src={google} alt={"google"} className={classes.loginImgbody}/> 
          </form>
        </body>
        <p className={classes.loginIntro}>
          Quizas te pueda interesar

          <table className={classes.loginTable}>
	        <tr>
	        	<td rowSpan="2" className={classes.loginTd}> 
	          		<h4> ByC tiene como objetivo servir de <br></br>
                medio para que las personas que <br></br>
                desean adquirir productos y/o <br></br>
                deshacerse de los que no utilizan, <br></br>
                obteniendo un beneficio monetario </h4>
	          	</td>
	          	<td className={classes.loginTd}>
	          		<p className={classes.loginSubinputd}><input className={classes.loginInput} type="search" placeholder="buscar..." autoFocus/></p>
	          	</td>
	        </tr>
          <tr>
            <td className={classes.loginTd}><img src={face} alt={"face"} className={classes.loginImgbody}/><img src={goog} alt={"goog"} className={classes.loginImgbody}/><img src={git} alt={"git"} className={classes.loginImgbody}/><img src={inst} alt={"inst"} className={classes.loginImgbody}/></td>
         </tr>
	       </table>
        </p>
      </div>
    );
  }
}

export default Login;