import React, { Component } from 'react';
import Classes from './Login.css';

import fb from './img/facebookWhite.png';
import goo from './img/googleWhite.png';
import git from './img/gitWhite.png';
import inst from './img/instWhite.png';

import Atributo from '../Formularios/Atributo/Atributo';
import axios from '../../AxiosFiles/axios.js';

class login extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      contrasenia: ''
    };

    this.AtributoHandler = this.AtributoHandler.bind(this);
  }

  AtributoHandler = (campo, valor) => {
    this.setState({ [campo]: valor });
  }

  SubmitHandler = (e) => {
    e.preventDefault();
    const data = this.state;
    axios({
      method: 'post',
      url: 'usuarios/login',
      data: data,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then((response) => {
      //handle success
      this.props.action(true);
      console.log(response);
    })
    .catch((response) => {
      //handle error
      this.props.action(true);
      console.log(response);
    });
  }

  render() {
    return (
      <div className={Classes.Login}>
        <div className={Classes.Form}>
          <h1>Ingresar</h1>
          <div className={Classes.Parte}>
          <Atributo titulo={"E-mail"} nombre={"email"}
            tipo={"email"} contenido={this.state.email} action={this.AtributoHandler}/>
          <Atributo titulo={"Contraseña"} nombre={"contrasenia"}
            tipo={"password"} contenido={this.state.password} action={this.AtributoHandler}/>
          </div>
          <div className={Classes.Botones}>
            <button onClick={this.SubmitHandler} className={Classes.BtnIngresar}>
              <h3>Ingresar</h3>
            </button>
            <button className={Classes.BtnForgotPassword}>
              Olvide mi contraseña :c
            </button>
          </div>
        </div>
        <div className={Classes.Info}>
          <div className={Classes.Texto}>
            <h2>Tal vez te interese...</h2>
            <h3>
              ByC tiene como objetivo servir de medio para que las personas que 
              desean adquirir productos y/o deshacerse de los que no utilizan,
              obteniendo un beneficio monetario.
            </h3>
          </div>
          <div className={Classes.Imagenes}>
            <img src={fb}/>
            <img src={goo}/>
            <img src={git}/>
            <img src={inst}/>
          </div>
        </div>
      </div>
    );
  }
}

export default login;