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

		const imagenes = [];
		console.log("req.files: " + req.files.length);

		for(let i = 0; i < req.files.length;i++){
			imagenes[i]=req.files[i].path;
		}
		const anuncio = new Anuncio({
			_id: new mongoose.Types.ObjectId(),
			usuario: req.userData.userId,
			titulo: req.body.titulo,
			descripcion: req.body.descripcion,
			fec_pub: req.body.fec_pub,
			activo: req.body.activo,
			categoria: req.body.categoria,
			subcategoria: req.body.subcategoria,
			precio: req.body.precio,
			imagen: imagenes
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
		const id = req.query.anuncioId;
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
		const id = req.body._id;
		const obj = req.body;
		delete obj._id;
		if (req.files.length > 0) {
			Anuncio.findById(id)
			.select('imagen')
			.exec()
			.then(doc=>{
				if (doc.imagen.length > 0) {
					for(let i = 0; i < doc.imagen.length; i++){
						fs.unlink(doc.imagen[i] , (err) => {
							if (err) {
								if (err.code === 'ENOENT'){
									Anuncio.update({_id:id},{$set: {imagen:[]}})
									.exec();
								}
							}else{
								console.log(doc.imagen[i]+' was deleted');
							}  
						});
					}
				}
				const imagenes = [];
				for(let i = 0; i < req.files.length;i++){
					imagenes[i]=req.files[i].path;
				}
				Anuncio.update({_id: id},{$set:{imagen:imagenes}})
				.exec();
			})
			.catch(err=>{throw err});
		}
		delete obj.imagen;
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
				console.log(doc.imagen.length);
				if (!doc) {
					return res.status(404).json({
						message: "Ad not found"
					});
				}else{
					if (doc.imagen.length > 0) {
						for(let i = 0; i< doc.imagen.length; i++){
							fs.unlink(doc.imagen[i] , (err) => {
							  if (err) throw err;
							  console.log(doc.imagen+' was deleted');
							});
						}
					}
					Anuncio.remove({_id: id})
					.exec()
					.then(result=> {
						res.status(200).json({
							message: 'Ad deleted'
						});
						Comentario.deleteMany({anuncio: id},(err)=>{
							if (err) throw err;
							console.log('Comentarios eliminados');
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
	},
	highlight: (req,res,next)=>{
		Anuncio.update({_id: req.body.anuncioId},{$set:{
			destacado:{
				plan:req.body.plan,
				fecha:req.body.fecha
			}
		}})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Ad updated'
			});
		})
		.catch(err =>{
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	},
	edit:(req,res,next)=>{
		Anuncio.findById(req.body.anuncioId)
			.select('_id titulo descripcion categoria subcategoria precio imagen activo')
			.populate('categoria')
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
				res.status(500).json({error: err});
			});
	}
}