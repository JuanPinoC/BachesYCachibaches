const mongoose = require('mongoose');
const Comentario = require('../models/comentario');

module.exports = {
	show:(req,res,next)=>{
		Comentario.find()
			.select('_id usuario anuncio fecha comentario')
			.populate('usuario','nombres')
			.populate('anuncio','titulo')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					products: docs.map(doc => {
						return {
							anuncio: doc.anuncio,
							usuario: doc.usuario,
							fecha: doc.fecha,
							comentario: doc.comentario,
							_id: doc._id
						}
					})
				};
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	create:(req,res,next)=>{
		const comentario = new Comentario({
			_id: new mongoose.Types.ObjectId(),
			anuncio: req.body.anuncio,
			usuario: req.body.usuario,
			fecha: req.body.fecha,
			comentario: req.body.comentario
		});
		comentario
			.save()
			.then(result => {
				res.status(201).json({
					message:'Created comentary succesfuly',
					createdComentary: {
						anuncio: result.anuncio,
						usuario: result.usuario,
						fecha: result.fecha,
						comentario: result.comentario,
						_id: result._id
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error:err
				});
			});
	},
	find:(req,res,next)=>{
		const id = req.params.comentarioId;
		Comentario.findById(id)
			.select('_id anuncio usuario fecha comentario')
			.populate('anuncio','titulo')
			.populate('usuario','nombres')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						comentario: doc
					});
				}else{
					res.status(404).json({message: 'No valid entry found for provided ID'});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({error: err});
			});
	},
	update:(req,res,next)=>{
		const id = req.params.comentarioId;
		const updateOps = {};
		for(const ops of req.body){
			updateOps[ops.propName] = ops.value;
		}
		Comentario.update({_id: id},{$set: updateOps})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Comentary Updated'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	delete:(req,res,next)=>{
		const id = req.params.comentarioId;
		Comentario.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Comentary deleted'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
}