import React,{ Component } from 'react';
import {NavLink} from 'react-router-dom';

import classes from './SearchBar.css';
import imgSearch from './search.png'

export default class searchBar extends Component {
	
	state = {
		inputText: ""
	}

	inputHandler = (e) => {
		this.setState({
			inputText: e.target.value
		});
	}

	clean = () => {
		this.setState({
			inputText: ""
		});
	}

	render(){
		return(
	    	<div className={classes.SearchBar}>
	    		<input value={this.state.inputText} onChange={this.inputHandler} />
	    		<div className={classes.SearchButton} onClick={this.clean}>
					<NavLink to={"/buscar/" + this.state.inputText} exact >
						<img src={imgSearch}/>
					</NavLink>
				</div>
	    	</div>
		);
	}
}