const mongoose = require('mongoose');

const comentarioSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	anuncio: {type: mongoose.Schema.Types.ObjectId, ref:'Anuncio', required: true},
	usuario: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
	fecha: {type: Date, default: Date.now},
	comentario: {type: String, required:true}
});
module.exports = mongoose.model('Comentario', comentarioSchema,'comentarios');
