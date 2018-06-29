import React,{Component} from 'react';
import Spinner from '../Spinner/Spinner';
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
						src={localStorage.getItem('path') + urls[i]}/>
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
			buttons: buttons,
			load: true
		});
	}

	btnClicked = (e) => {
		this.setState({
			puntero: e.target.id
		});
	}

	render(){
		return(!this.state.load)?(<Spinner />):(
			<div className={Classes.SlideShow}>
				<center>
					<div className={Classes.Imagen}>
						<span className={Classes.Helper}></span>
						{this.state.vistas[this.state.puntero]}
					</div>
					{this.state.buttons}
				</center>
			</div>
		);
	}
}