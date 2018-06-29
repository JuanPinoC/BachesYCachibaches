import React from 'react';
import classes from './Comments.css';
import Comment from './Comment/Comment';

const comments = (props) => (
		<div className={classes.Comments}>
			<h2>Comentarios</h2>
			<textarea 
			placeholder="Escribe un comentario" 
			cols="55"
			rows="4">
			</textarea>
			<hr style={{width:'90%'}}/>
			<Comment 
			url="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/User-blue-icon.png"
			name="Renzo Davila"
			msn="Estan vacunados?"
			/>
			<Comment 
			url="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/User-blue-icon.png"
			name="Johan Miranda"
			msn="Por supuesto"
			/>
			<Comment 
			url="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/User-blue-icon.png"
			name="Renzo Davila"
			msn="Reserveme 20"
			/>
		</div>
	);

export default comments;