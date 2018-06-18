import React,{Component} from 'react';

import Classes from './SlideShow.css';

export default class slideShow extends Component{
	
	state = {
		urls: this.props.data,
		vistas: [],
		buttons: [],
		puntero: 0
	}

	componentDidMount = () => {
		let vistas = [];
		let buttons = [];
		let urls = this.state.urls;

		for(let i=0,l=urls.length;i < l; i++){
				vistas.push(
					//<img src={require('../../backend/uploads/' + urls[0].substring(8))}/>
					<img src={require('../../backend/uploads/' + urls[i].substring(8))}/>
				);
				buttons.push(
					<button id={i} key={i} className={Classes.Btn} onClick={this.btnClicked}/>
				);
		}
		
		this.setState({
			vistas: vistas,
			buttons: buttons
		});
	}

	btnClicked = (e) => {
		console.log(e.target.id);

		this.setState({
			puntero: e.target.id
		});
	}

	prevHandler = () => {
		if(this.state.puntero != 0){
			this.setState({
				puntero: this.state.puntero-1
			});
		}
	}

	nextHandler = () => {
		if(this.state.puntero != this.state.vistas.length-1){
			this.setState({
				puntero: this.state.puntero+1
			});
		}
	}

	render(){
		return(
			<div className={Classes.SlideShow}>
				<button 
					onClick={this.prevHandler} 
					className={Classes.BtnPrev} 
					key={"prev"}>
					<h1>&lt;</h1>
				</button>
				<button 
					onClick={this.nextHandler}
					className={Classes.BtnNext}
					key={"next"}>
					<h1>&gt;</h1>
				</button>
				{this.state.vistas[this.state.puntero]}
				{this.state.buttons}
			</div>
		);
	}
}