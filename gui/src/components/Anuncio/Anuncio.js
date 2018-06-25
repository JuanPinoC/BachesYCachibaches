import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Anuncio.css';
import img from './img.jpg';
import imgDestacado from './star.png';

export default class anuncio extends Component{

	constructor (props) {
		super(props);

		const data = props.data;

		this.state = {
			data: data,
			_id: data._id,
			id_cat: data.categoria._id,
			nom_cat: data.categoria.nombre,
			fec_pub: data.fec_pub,
			img: data.imagen,
			precio: data.precio,
			sub_cat: data.subcategoria,
			titulo: data.titulo,
			usuario: (data.usuario)?data.usuario._id:"",
			nombres: (data.usuario)?data.usuario.nombres:""
		}
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
