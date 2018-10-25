const mongoose = require('mongoose');
const defaultPicture = 'profilePictures\\default.jpeg';

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	nombres: {type: String, required: true},
	apellidos: {type: String, required: true},
	telefono: {type: Number, default:null},
	celular: {type: Number, default:null},
	direccion: {type:String, default:null},
	email: { 
		type: String, 
		required: true, 
		unique: true, 
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
	puntuacion: {type:Number, default:100},
	latitud: {type:Number, default: null},
	longitud: {type:Number, default: null},
	foto: {type:String, default: defaultPicture},
	contrasenia: {type: String, required: true},
	tipo: {type: String, required: true}
});
module.exports = mongoose.model('User', userSchema,'usuarios');

