const mongoose = require('mongoose');

const planSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	porcentaje: {type: Number, required: true},
	tiempo: {type: Number, required: true},
	precio: {type: Number, required: true}
});
module.exports = mongoose.model('Plan', planSchema,'planes');

