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
					<img 
						src={require('../../backend/uploads/' + urls[i].substring(8))}/>
				);
				buttons.push(
					<button 
						id={i} 
						key={i} 
						className={Classes.Btn} 
						onClick={this.btnClicked}/>
				);
		}
		
		this.setState({
			vistas: vistas,
			buttons: buttons
		});
	}

	btnClicked = (e) => {
		this.setState({
			puntero: e.target.id
		});
	}

	render(){
		return(
			<div className={Classes.SlideShow}>
				<center>
					{this.state.vistas[this.state.puntero]}
					{this.state.buttons}
				</center>
			</div>
		);
	}
}