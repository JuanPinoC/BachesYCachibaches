const mongoose = require('mongoose');
const Compra = require('../models/compra');
const Anuncio = require('../models/anuncio');

module.exports = {
	show: (req,res,next)=> {
		Compra.find()
			.select('_id anuncio comprador vendedor fecha')
			.populate('anuncio','titulo')
			.populate('comprador','email')
			.populate('vendedor','email')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					compra: docs.map(doc => {
						return {
							anuncio: doc.anuncio,
							comprador: doc.comprador,
							vendedor: doc.vendedor,
							fecha: doc.fecha,
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
	create: (req,res,next)=>{
		Anuncio.findById(req.body.anuncio)
			.then(product => {
				if(!product) {
					return res.status(404).json({
						message: "Ad not found"
					});
				}
				const compra = new Compra({
					_id: mongoose.Types.ObjectId(),
					anuncio: req.body.anuncio,
					comprador: req.body.userId,
					vendedor: req.userData.userId, 
					fecha: req.body.fecha
				});
				return compra
				.save()
			})
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'Compra exitosa',
					createPurchase: {
						_id: result._id,
						anuncio: result.anuncio,
						comprador: result.comprador,
						vendedor: result.vendedor,
						fecha: result.fecha
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
		const id = req.query.compraId;
		Compra.findById(id)
			.select('_id anuncio comprador vendedor fecha')
			.populate('anuncio','titulo')
			.populate('comprador','email')
			.populate('vendedor','email')
			.exec()
			.then(doc => {
				if(doc){
					res.status(200).json({
						compra:doc
					});
				}else{
					res.status(404).json({message:'No valid entry for provided ID'});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error:err
				});
			});
	},
	update:(req,res,next)=>{
		const id = req.body.compraId;
		const updateOps = req.body;
		delete updateOps.compraId
		Compra.update({_id: id},{$set: updateOps})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Purchase updated',
					compraUpdated: result
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
		const id = req.body.compraId;
		Compra.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message:'Purchase deleted'
				});
			})
			.catch(err=>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	getPurchaseByToken:(req,res,next)=>{
		const id = req.userData.userId;
		Compra.find({comprador:id})
			.select('_id anuncio vendedor fecha')
			.populate('anuncio','titulo precio')
			.populate('vendedor','nombres email')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					compra: docs.map(doc => {
						return {
							anuncio: doc.anuncio,
							vendedor: doc.vendedor,
							fecha: doc.fecha,
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
} 