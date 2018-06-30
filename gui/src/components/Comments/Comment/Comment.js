import React from 'react';
import classes from './Comment.css';

const comment = (props) => (
		<div className={classes.Comment}>
			<img src={props.url}/>
			<text>
			{props.name + ":" + props.msn}
			</text>
			<hr style={{width:'90%'}}/>
		</div>
	);

export default comment;