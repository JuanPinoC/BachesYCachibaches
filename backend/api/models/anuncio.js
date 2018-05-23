const mongoose = require('mongoose');
const Usuario = require('../models/user');

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
	destacado: {type:[destacado], required: false},
	imagen: {type: String, required: true}
});
Anuncio = mongoose.model('Anuncio', anuncioSchema,'anuncios');

module.exports = {
	show: (req,res,next)=>{
		Anuncio.find()
			.select('_id usuario titulo fec_pub categoria subcategoria precio imagen')
			.populate('usuario','nombres')
			.populate('categoria','nombre')
			.exec()
			.then(docs => {
				res.status(200).json({
					count: docs.length,
					orders: docs.map(doc => {
						return {
							_id: doc._id,
							usuario: doc.usuario,
							titulo: doc.titulo,
							fec_pub: doc.fec_pub,
							categoria: doc.categoria,
							subcategoria: doc.subcategoria
						}
					})
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				})
			});
	},
	create: (req,res,next)=>{
		const anuncio = new Anuncio({
			_id: new mongoose.Types.ObjectId(),
			usuario: req.params.userId,
			titulo: req.body.titulo,
			descripcion: req.body.descripcion,
			fec_pub: req.body.fec_pub,
			activo: req.body.activo,
			categoria: req.body.categoria,
			subcategoria: req.body.subcategoria,
			precio: req.body.precio,
			destacado: req.body.destacado,
			imagen: req.file.path
		});
		anuncio
			.save()		
			.then(result=>{
				console.log(result);
				res.status(201).json({
					message: 'Created ad succesfully',
					createdAd: {
						_id: result._id,
						usuario: result.usuario,
						titulo: result.titulo,
						fec_pub: result.fec_pub,
						categoria: result.categoria,
						subcategoria: result.subcategoria,
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
}