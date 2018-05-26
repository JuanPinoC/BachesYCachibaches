const mongoose = require('mongoose');
const Anuncio = require('../models/anuncio');
const Comentario = require('../models/comentario');
const fs = require('fs');

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
							subcategoria: doc.subcategoria,
							precio: doc.precio,
							imagen: doc.imagen
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
			usuario: req.body.userId,
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
						imagen: result.imagen
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
	find: (req,res,next)=>{
		const id = req.body.anuncioId;
		Anuncio.findById(id)
			.select('_id usuario titulo fec_pub categoria subcategoria precio imagen')
			.populate('usuario','nombres')
			.populate('categoria','nombre')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						anuncio: doc
					});
				}else{
					res.status(404).json({message: 'No valid entry found for provided ID'});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	update: (req,res,next)=>{
		const id = req.body.anuncioId;
		const obj = req.body;
		delete obj._id;
		if (req.file !== undefined) {
			Anuncio.findById(id)
			.select('imagen')
			.exec()
			.then(doc=>{
				fs.unlink(doc.imagen , (err) => {
					  if (err) throw err;
					  console.log(doc.imagen+' was deleted');
					}
				);
			});
			obj.imagen = req.file.path;
		}
		Anuncio.update({_id:id},{$set: obj })
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Ad updated'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	delete: (req,res,next)=>{
		const id = req.body.anuncioId;
		Anuncio.findById(id)
			.select('imagen')
			.exec()
			.then(doc=>{
				if (!doc) {
					return res.status(404).json({
						message: "Ad not found"
					});
				}else{
					fs.unlink(doc.imagen , (err) => {
					  if (err) throw err;
					  console.log(doc.imagen+' was deleted');
					});
					Anuncio.remove({_id: id})
					.exec()
					.then(result=> {
						res.status(200).json({
							message: 'Ad deleted'
						});
						Comentario.deleteMany({anuncio: id},(err)=>{
							if (err) throw err;
							console.log('Comenatarios eliminados');
						})
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err
						});
					});
				}
			})
			.catch(err => {
						console.log(err);
						res.status(500).json({
							error: err
						});
					});
	}
}