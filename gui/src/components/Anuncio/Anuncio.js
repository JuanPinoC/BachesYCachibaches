import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Anuncio.css';
import img from './img.jpg';
import imgDestacado from './star.png';

export default class anuncio extends Component{
	
	state = {
		data: this.props.data,
		_id: this.props.data._id,
		id_cat: this.props.data.categoria._id,
		nom_cat: this.props.data.categoria.nombre,
		fec_pub: this.props.data.fec_pub,
		img: this.props.data.imagen,
		precio: this.props.data.precio,
		sub_cat: this.props.data.subcategoria,
		titulo: this.props.data.titulo,
		usuario: this.props.data.usuario._id,
		nombres: this.props.data.usuario.nombres
	}

	render(){
		return(
			<table className={Classes.Anuncio}>
				<NavLink to={"/anuncio/"+this.state._id} exact >
					<tr className={Classes.Publicacion}>
						<td className={Classes.Imagen}>
							<img src={(typeof this.state.img == 'undefined')?
								img:
								require('../../backend/uploads/'+this.state.img[0].substring(8))}/>
						</td>
						<td className={Classes.Info}>
							<h2 className={Classes.Precio}>{"S/. " + this.state.precio}</h2>
							<h2>{this.state.titulo}</h2>
							<h3>{this.state.nombres}</h3>
							<p>Descripción de la publicación</p>
							<h3>{this.state.sub_cat}</h3>
							<h4>{this.sub_cat}</h4>
							<img className={Classes.Destacado} src={imgDestacado}/>
						</td>
					</tr>
				</NavLink>
			</table>
		);	
	}
}
