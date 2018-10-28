import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

import Classes from './Anuncio.css';
import img from './img.jpg';
import imgNoDestacado from './star.png';
import imgDestacado from './star-black.png';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default class anuncio extends Component{

	constructor (props) {
		super(props);

		const data = props.data;
		console.log("Anuncio",data);
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
			destacado: (data.destacado)?data.destacado.fecha:null,
			usuario: (data.usuario)?data.usuario._id:"",
			nombres: (data.usuario)?data.usuario.nombres:""
		}
	}

	render(){
		return(
		<Aux>
		<NavLink to={"/anuncio/"+this.state._id} exact >
		<div className={Classes.Anuncio}>
			<div className={Classes.Foto}>
				<img alt="" src={localStorage.getItem('path') + this.state.img[0]}/>
			</div>
			<div className={Classes.Datos}>
				<div className={Classes.Primera}>
					<h2>{this.state.titulo}</h2>
					<h3>{this.state.nombres}</h3>
					<h3>{this.state.sub_cat}</h3>
				</div>
				<div className={Classes.Segunda}>
					<h2>{"$/." + this.state.precio}</h2>
					{(this.state.destacado !== null)?
								<img alt="Destacado" src={imgDestacado}/>:
								<img alt="No Destacado" src={imgNoDestacado}/>}
				</div>
			</div>
		</div>
		</NavLink>
		
		</Aux>
		);	
	}
}
