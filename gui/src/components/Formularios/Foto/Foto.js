import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Foto.css';

class foto extends Component {

  state = {
    file:'',
    imagePreviewUrl: ''
  };

  ImageChangeHandler = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(typeof file != 'undefined'){
      reader.onloadend = () => {
        this.setState({
            file: file,
            imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
  }

  ImageDeleteHandler = (e) =>{
    this.setState({
      file: '',
      imagePreviewUrl: ''
    });
  }

  render(){
    return (
      <div className={Classes.FotoFormulario}>
        <div className={Classes.AtributoImagen}>
          <label  
            for='imagen'
            className={Classes.ImagenLabel}>
              Agregar Imagen
          </label>
          <input 
            className={Classes.ImagenInput}
            name='imagen'
            id='imagen'
            type="file"
            onChange={this.ImageChangeHandler}/>
        </div>
        <div className={Classes.Imagen}>
          <img src={this.state.imagePreviewUrl}/>
        </div>
      </div>
    );
    }
}

export default foto;