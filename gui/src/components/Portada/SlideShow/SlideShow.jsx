import React, { Component } from 'react';

import Spinner from '../../Spinner/Spinner';

import Classes from './SlideShow.css';

export default class slideShow extends Component {
	
	state = {
		imgs: this.props.imagenes,
		labels: this.props.labels,
		estilo: Classes.Frame1,
		index: 0
	}

	componentDidMount = () => {
		setInterval(this.animate,3000);
		this.setState({load: true});
	}

	animate = () => {
		setTimeout(this.setIndex,3000);
		setTimeout(() => {this.setEstilo(Classes.Frame1)},3000);
		setTimeout(() => {this.setEstilo(Classes.Frame2)},2900);
	}

	setIndex = () => {
		let index = this.state.index+1;
		
		if(index == this.state.imgs.length){
			index = 0;
		}

		this.setState({
			index: index
		});
	}

	setEstilo = (estilo) => {
		this.setState({
			estilo: estilo
		});
	}

	render() {
		return (this.state.load)?(
			<div className={Classes.SlideShow}>
				<div className={this.state.estilo}>
					<div className={Classes.Texto}>
						<center>{this.state.labels[this.state.index]}</center>
					</div>
					<div className={Classes.Imagen}>
						<img src={require("../img/"+this.state.imgs[this.state.index])}/>
					</div>
				</div>
			</div>
		):(<Spinner/>);
	}
}