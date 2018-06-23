import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Imagenes.css';

class imagenes extends Component {

    state = {
      files: [],
      imgs:[],
      views: [],
      data: (this.props.data)?this.props.data:[]
    };

    componentWillMount = () => {
      
    }

  ImageChangeHandler = (e) => {
    e.preventDefault();
    for(let i=0, l=e.target.files.length; i < l; i++ ){
      this.addFile(e, i);
    }
  }

  addFile = (e, i) => {
    let reader = new FileReader();
    let file = e.target.files[i];

    if(typeof file != 'undefined'){
      reader.onloadend = () => {
        this.setState({
          imgs: [].concat(this.state.imgs).concat({
            name: Math.random(),
            file: file,
            imagePreviewUrl: reader.result,
          })
        });
        this.setState({
          views: [].concat(this.state.views).concat(
            <img
              src={reader.result}
              name={this.state.imgs[this.state.imgs.length-1].name} 
              onClick={this.ImageDeleteHandler}/>
            )
        });
        
        if(this.props.action)this.props.action("imagen",this.state.imgs); 
      }
      reader.readAsDataURL(file)
    }
  }

  ImageDeleteHandler = (e) =>{
    
    let imgs = this.state.imgs;
    let views = this.state.views;

    let indiceImgs = imgs.indexOf(
      imgs.find( (element) => {
        return element.name == e.target.name;
      })
    );

    imgs.splice(indiceImgs,1);
    views.splice(indiceImgs,1);

    this.setState({
      imgs: imgs,
      views: views
    });

    if(this.props.action)this.props.action("imagen",this.state.imgs);
  }

  render(){
    return (
      <div className={Classes.ImagenesFormulario}>
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
            onChange={this.ImageChangeHandler} multiple/>
        </div>
        <div className={Classes.Imagenes}>
          {this.state.views}
        </div>
      </div>
    );
    }
}

export default imagenes;