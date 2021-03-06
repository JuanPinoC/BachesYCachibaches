import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import Classes from './Login.css';

import fb from './img/facebookWhite.png';
import goo from './img/googleWhite.png';
import git from './img/gitWhite.png';
import inst from './img/instWhite.png';

import Atributo from '../Formularios/Atributo/Atributo';
import axios from '../../AxiosFiles/axios.js';

class login extends Component {

  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: ''
  };
  responseFacebook = response => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
  };

  componentClick = () => console.log("clicked");

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      contrasenia: '',
      newPassForm: false
    };

    this.AtributoHandler = this.AtributoHandler.bind(this);
  }

  AtributoHandler = (campo, valor) => {
    this.setState({ [campo]: valor });
  }

  changeForm = () => {
    const oldState = this.state.newPassForm;
    this.setState({
      newPassForm: !oldState
    });
  }

  SubmitHandler = (e) => {
    e.preventDefault();
    const data = this.state;

    let url = 'usuarios/login';

    if(data.newPassForm){
      url = 'usuarios/password';
    }

    axios({
      method: 'post',
      url: url,
      data: data,
      config: { headers: {'Content-Type': 'multipart/form-data',  }}
    })
    .then((response) => {
      //handle success
      if(!data.newPassForm){
        sessionStorage.setItem('jwtToken', response.data.token);
        this.props.action();
      }else{
        this.changeForm();
        alert("Contraseña cambiada con exito, email enviado al correo con la nueva contraseña.");
      }

      //console.log(response);
    })
    .catch((response) => {
      //handle error
      this.props.action();
      if(!data.newPassForm){
        alert("Usuario o contraseña incorrectos.");
      }else{
        alert("Usuario no encontrado.");
      }
      //console.log(response);
    });
  }

  render() {
    let fbContent;
    let redirect = (sessionStorage.getItem('jwtToken')!="null")?<Redirect to="/" />:null;

    if(this.state.isLoggedIn){
      fbContent = (
          <div style={{
            with: '400px',
            margin: 'auto',
            background: '#f4f4f4',
            padding: '20px'
          }}>
            <img src={this.state.picture} alt={this.state.name} />
            <h2>Holi {this.state.name}</h2>
            Email: {this.state.email}
          </div>
        )
    }else{
      fbContent = (
        <FacebookLogin
        appId="451339475272860"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />);
      /*goContent = (
        <GoogleLogin
        clientId="606790169121-g9m43sk15b7rdp0eumkaigvr9lc8bqqm.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        />);*/
  
    }

    return (
      <div className={Classes.Login}>
        {redirect}
        <div className={Classes.Form}>
        {(this.state.newPassForm)?<h1>Cambiar Contraseña</h1>:<h1>Ingresar</h1>}
          <div className={Classes.Parte}>
          <Atributo titulo={"E-mail"} nombre={"email"}
            tipo={"email"} contenido={this.state.email} action={this.AtributoHandler}/>
          {(this.state.newPassForm)?
            <h3>Un correo con la nueva contraseña será enviado.</h3>
            :
            <Atributo titulo={"Contraseña"} nombre={"contrasenia"}
              tipo={"password"} contenido={this.state.password} action={this.AtributoHandler}/>
          }
          </div>
          {
            (this.state.newPassForm)?(
              <div className={Classes.Botones}>
                <button onClick={this.SubmitHandler} className={Classes.BtnIngresar}>
                  <h3>Cambiar Contraseña</h3>
                </button>
                <button className={Classes.BtnForgotPassword} onClick={this.changeForm}>
                  Volver
                </button>
              </div>
            ):(
              <div className={Classes.Botones}>
                <button onClick={this.SubmitHandler} className={Classes.BtnIngresar}>
                  <h3>Ingresar</h3>
                </button>
                <button className={Classes.BtnForgotPassword} onClick={this.changeForm}>
                  Olvide mi contraseña :c
                </button>
              </div>
              
            )
          }
          <div className={Classes.Botones}>
            {fbContent}
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