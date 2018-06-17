import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from '../../AxiosFiles/axios';

import Classes from './AnuncioDetalle.css';

import Valoracion from '../Perfil/Valoracion/Valoracion';
import Comentarios from '../Comentarios/Comentarios';

import img from './img.jpg';
import imgUsuario from '../Perfil/Usuario/userExample.png';
import imgDestacado from '../Anuncio/star.png';


export default class anuncioDetalle extends Component{

	state = {
		anuncioId: this.props.match.params.id
	}

	componentWillMount = () => {
  		axios.get('anuncios/find?anuncioId=' + this.state.anuncioId,
  			{headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
  		.then((response) => {
  			const data = response.data.anuncio;
  			console.log(data);
  			this.setState({
  				_id: data._id,
				id_cat: data.categoria._id,
				nom_cat: data.categoria.nombre,
				fec_pub: data.fec_pub,
				img: data.imagen,
				precio: data.precio,
				sub_cat: data.subcategoria,
				titulo: data.titulo,
				usuario: data._id,
				nombres: data.nombres
  			});
  		})
  		.catch((response) => {
  			console.log(response);
  		});
	}

	render(){
		return(
			<div className={Classes.AnuncioDetalle}>
				<center>
					<tr className={Classes.PublicacionDetalle}>
						<td className={Classes.Imagen}>
							<img src={
								(typeof this.state.img == 'undefined')?
								img:
								require('../../backend/uploads/'+this.state.img[0].substring(8))
							}/>
						</td>
						<td className={Classes.Info}>
							<h2 className={Classes.Precio}>$100</h2>
							<h2 className={Classes.TituloPublicacionDetalle}>
								{
									//this.props.nombre||this.props.match.params.id
									this.state.titulo
								}
							</h2>
							<h4 className={Classes.TextoPublicacionDetalle}>
								quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto
							</h4>
							<h3 className={Classes.TextoPublicacionDetalle}>
								Categoria
							</h3>
						</td>
						<div className={Classes.UsuarioPublicacionDetalle}>
							<div className={Classes.UsuarioImagenDetalle}>
								<img src={imgUsuario}/>
							</div>
							<h4>Usuario</h4>
							<div className={Classes.UsuarioPuntuacionDetalle}>
								<Valoracion val={3}/>
							</div>
						</div>
					</tr>
				</center>
					<Comentarios anuncio={this.state.anuncioId} />
				</div>
		);
	}	
}