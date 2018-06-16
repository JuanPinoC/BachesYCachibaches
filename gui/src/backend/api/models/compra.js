const mongoose = require('mongoose');

const compraSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	anuncio: {type: mongoose.Schema.Types.ObjectId, ref:'Anuncio', required: true},
	usuario: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
	fecha: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Compra', compraSchema,'compras');

