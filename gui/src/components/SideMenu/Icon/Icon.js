import React from 'react';
import classes from './Icon.css';

const icon = (props) => {
	return (
			<div className={classes.Icon}>
				<img alt="" src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/User-blue-icon.png"/>
				<h4>{props.category}</h4>
			</div>
		);
}

export default icon; 