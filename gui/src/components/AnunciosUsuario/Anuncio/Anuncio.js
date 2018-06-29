import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Anuncio.css';
import img from './img.jpg';
import imgNoDestacado from './star.png';
import imgDestacado from './star-black.png';

export default class anuncio extends Component{
	
	state = (this.props.data)?{
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
		nombres: this.props.data.usuario.nombres,
		destacado: this.props.data.destacado
	}:{
		nom_cat: "Categoria",
		precio: 200,
		sub_cat: "subcategoria",
		titulo: "Titulo",
		nombres: "Nombres"
	}

	render(){
		console.log(this.state.destacado);
		return(
			<table className={Classes.Anuncio}>
					<tr className={Classes.Publicacion}>
						<td className={Classes.Imagen}>
							<img src={localStorage.getItem('path') + this.state.img[0]}/>
						</td>
						<td className={Classes.Info}>
							<h2 className={Classes.Precio}>{"S/. " + this.state.precio}</h2>
							<h2>{this.state.titulo}</h2>
							
							<h3>{this.state.sub_cat}</h3>
							<h4>{this.sub_cat}</h4>
							{(this.state.destacado.plan != null)?
								(<img className={Classes.Destacado} src={imgDestacado}/>):
								(<img className={Classes.Destacado} src={imgNoDestacado}/>)}
						</td>
						<td className={Classes.Opciones}>
							<NavLink to={"/anuncio/"+this.state._id} exact>
								<h4 className={Classes.Opcion}>Ver</h4>
							</NavLink>
							{
								(this.state.destacado.plan == null)?
								(
								<NavLink to={"/destacarAnuncio/"+this.state._id} exact>
									<h4 className={Classes.Opcion}>Destacar</h4>
								</NavLink>
								):(<div></div>)
							}
							<NavLink to={"/EditarAnuncio/"+this.state._id} exact>
								<h4 className={Classes.Opcion}>Editar</h4>
							</NavLink>
							<NavLink to={"/Vendido/"+this.state._id} exact>
								<h4 className={Classes.Opcion}>Vendido (¡Yey!)</h4>
							</NavLink>
						</td>
					</tr>
			</table>
		);	
	}
}
