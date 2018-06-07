const mongoose = require('mongoose');

const destacado = mongoose.Schema({
	plan: {type: mongoose.Schema.Types.ObjectId, default: null},
	fecha: {type: Date, default: null}
});

const anuncioSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	usuario: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
	titulo: {type: String, required: true},
	descripcion: {type: String, required: true},
	fec_pub: {type:Date, default: Date.now},
	activo: {type:Boolean, default:true},
	categoria: {type: mongoose.Schema.Types.ObjectId, ref:'Categoria', required: true},
	subcategoria: {type:String, required: true},
	precio: {type: Number, required: true},
	destacado: {type: destacado, default: destacado},
	imagen: {type:Array, required: true}
});
module.exports = mongoose.model('Anuncio', anuncioSchema,'anuncios');

