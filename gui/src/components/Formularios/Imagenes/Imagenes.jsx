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
      this.addData();
    }

    addData = () => {
      /*
      let blob = null;
      let req = new XMLHttpRequest();
      let route = '../../../backend/uploads/' + this.state.data[0].substring(8);
      console.log("ruta",route);
      req.open("GET",route);
      req.setRequestHeader("Response-Type","blob");
      req.overrideMimeType('text/plain; charset=utf-8');
      req.onload = (e) => {
        console.log("response",req.multipart);
      }

      req.send();
      */
      
      /*let myReader = new FileReader();
      myReader.readAsArrayBuffer(blob);
      myReader.onloadend = (e) => {
        let buffer = e.srcElement.result;
      };
      */
      /*
      const file = require('../../../backend/uploads/' + this.props.data[0].substring(8));
      let archivo = new File(file);
      console.log("Imagen",archivo);
      */

    }

  ImageChangeHandler = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

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
            onChange={this.ImageChangeHandler}/>
        </div>
        <div className={Classes.Imagenes}>
          {this.state.views}
        </div>
      </div>
    );
    }
}

export default imagenes;