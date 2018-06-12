const mongoose = require('mongoose');

const subcategoria = mongoose.Schema({
	nombre: {type: String, required: true}
});
const categoriaSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nombre: {type: String, required: true},
	subcategorias: {type:[subcategoria], required: true}
});
module.exports = mongoose.model('Categoria', categoriaSchema,'categorias');

