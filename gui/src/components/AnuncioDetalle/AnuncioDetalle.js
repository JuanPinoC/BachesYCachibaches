import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../AxiosFiles/axios';

import Classes from './AnuncioDetalle.css';

import SlideShow from '../SlideShow/SlideShow';
import Valoracion from '../Perfil/Valoracion/Valoracion';
import Comentarios from '../Comentarios/Comentarios';

import img from './img.jpg';
import imgUsuario from '../Perfil/Usuario/userExample.png';
import imgDestacado from '../Anuncio/star.png';

import Spinner from '../Spinner/Spinner';


export default class anuncioDetalle extends Component{

	state = {
		anuncioId: this.props.match.params.id,
		usuarioByToken: ""
	}

	componentWillMount = () => {
  		axios.get('anuncios/find?anuncioId=' + this.state.anuncioId,
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			const data = response.data.anuncio;
  			console.log("AnuncioUsuario",data.usuario._id);
  			this.setState({
  				_id: data._id,
				id_cat: data.categoria._id,
				nom_cat: data.categoria.nombre,
				fec_pub: data.fec_pub,
				img: data.imagen,
				precio: data.precio,
				sub_cat: data.subcategoria,
				titulo: data.titulo,
				descripcion: data.descripcion,
				usuario: data.usuario._id,
				nombres: data.usuario.nombres,
				foto_usuario: data.usuario.foto,
				load:true
  			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});

  		axios.get('usuarios/menu',
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then(doc=>{
  			console.log("Usuario",doc.data.usuario._id)
  			this.setState({
  				usuarioByToken:doc.data.usuario._id 
  			})
  		})
	}

	render(){
		return(
			<div className={Classes.AnuncioDetalle}>
				<div className={Classes.PublicacionDetalle}>
					<div className={Classes.Imagen}>
						{(typeof this.state.img != 'undefined')?
							(<SlideShow data={this.state.img}/>):
							(<Spinner />)
						}
					</div>
					<div className={Classes.Info}>
						<h2 className={Classes.Precio}>S/. {this.state.precio}</h2>
						<h2 className={Classes.Titulo}>
							{this.state.titulo}
						</h2>
						<h3 className={Classes.TextoPublicacionDetalle}>
							Categoría: {this.state.nom_cat}
						</h3>
						<h3 className={Classes.TextoPublicacionDetalle}>
							Subcategoría: {this.state.sub_cat}
						</h3>
						<br/>
						<h4 className={Classes.Texto}>
							Descripción:
							{this.state.descripcion}
						</h4>
					</div>
					<div className={Classes.InfoUsuario}>
						<center>
							<img src={localStorage.getItem('path') + this.state.foto_usuario}/>
							<h4>{this.state.nombres}</h4>
							<div className={Classes.Valoracion}>
								<Valoracion val={3}/>
							</div>
							<br/>
							<NavLink to={"/perfil/"+this.state.usuario} exact >
								<button className={Classes.Opcion}><h2>Contactar</h2></button>
							</NavLink>
							{(this.state.usuarioByToken !== this.state.usuario)?
							null:(<NavLink to={"/Vendido/"+this.state._id}>
								<button className={Classes.Opcion}><h2>Vender</h2></button>
							</NavLink>)}
						</center>
					</div>
				</div>
				<Comentarios anuncioId={this.state.anuncioId} />
			</div>
		);
	}	
}