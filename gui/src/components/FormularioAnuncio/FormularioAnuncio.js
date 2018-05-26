import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './FormularioAnuncio.css';

class formularioAnuncio extends Component {

  	state = {
      file: [],				//archivos
      imagePreviewUrl: [],	//URLS
      views: []				//array de <img> de HTML
    };

    ImageChangeHandler = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: [].concat(this.state.file).concat(file),
				imagePreviewUrl: [].concat(this.state.imagePreviewUrl).concat(reader.result)
			});
			this.setState({views: [].concat(this.state.views).concat(<img src={reader.result} name={this.state.views.length} onClick={this.ImageDeleteHandler} />)});
		}

		reader.readAsDataURL(file)
	}

	ImageDeleteHandler = (e) =>{
		let tf = this.state.file;
		let tu = this.state.imagePreviewUrl;
		let tv = this.state.views;
		tf.splice(parseInt(e.name),1);tu.splice(parseInt(e.name),1);tv.splice(parseInt(e.name),1);
		this.setState({
			file: tf,
			imagePreviewUrl: tu,
			views: tv
		});
	}

  	render(){
    return (
    <div className={Classes.FormularioAnuncio}>
      <center><h1>Crear Anuncio</h1></center>
      <hr/>
      <form method='POST' >
        <div className={Classes.Parte}>
          <div className={Classes.Atributo}>
            <label>Título:</label> <input  type="text" name='titulo'/>
          </div>
          <div className={Classes.Atributo}>
            <label>Descripción:</label><input  type="text" vname='descripcion'/>
          </div>
          <div className={Classes.Atributo}>
            <label>Usuario:</label><input  type="text" name='usuario'/>
          </div>
          <div className={Classes.Atributo}>
            <label>Activo:</label><input  type="text" name='activo'/>
          </div>
          <div className={Classes.Atributo}>
            <label>Fecha publicación:</label><input  type="date" name='fec_pub'/>
          </div>  
        </div>
        <div className={Classes.Parte}>
          <div className={Classes.Atributo}>
            <label>Categoria:</label><input  type="text" name='categoria'/>
          </div>
          <div className={Classes.Atributo}>
            <label>SubCategoria:</label><input  type="text" name='sub_cat'/>
          </div>
          <div className={Classes.Atributo}>
            <label>Precio:</label><input  type="number" name='precio'/>
          </div>
          <div className={Classes.Atributo}>
            <label>Destacado:</label><input  type="text" name='destacado'/>
          </div>
        </div>
        <div className={Classes.ParteImagen}>
          <div className={Classes.AtributoImagen}>
            <label for='imagen' className={Classes.ImagenLabel}>Agregar Imagen</label>
            <input className={Classes.ImagenInput} name='imagen' id='imagen' type="file" onChange={this.ImageChangeHandler}/>
          </div>
          <div className={Classes.Imagenes}>
          	  {this.state.views}
          </div>
        </div>
        <div className={Classes.Botones}>
          <button className={Classes.BtnCrear}><h2>Crear</h2></button>
          <button className={Classes.BtnCancelar}><h2>Cancelar</h2></button>
        </div>
      </form>
    </div>
  );
  }
}

export default formularioAnuncio;