const mongoose = require('mongoose');
const Categoria = require('../models/categoria');

module.exports = {
	show: (req,res,next)=>{
		Categoria.find()
			.select('_id nombre subcategorias')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					products: docs.map(doc => {
						console.log(doc.subcategorias);
						return {
							name: doc.nombre,
							_id: doc._id,
							subcategorias: doc.subcategorias
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
		const sub = [];
		for (const e of req.body.subcategorias){
			sub.push({nombre: e.nombre});
		}
		const categoria = new Categoria({
			_id: new mongoose.Types.ObjectId(),
			nombre: req.body.nombre,
			subcategorias: sub		
		});
		categoria
			.save()
			.then(result=>{
				console.log(result);
				res.status(200).json({
					message: 'Created category succesfuly',
					createdCategory: {
						nombre: result.nombre,
						_id: result._id,
						subcategorias: result.subcategorias
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
		const id = req.query.categoryId;
		Categoria.findById(id)
			.select('name _id subcategorias')
			.exec()
			.then(doc=> {
				if (doc) {
					res.status(200).json({
						categoria: doc
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
		const id = req.body.categoryId;
		const updateOps = req.body;
		delete updateOps._id
		Categoria.update({_id:id},{$set: updateOps})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Category updated'
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
		const id = req.body.categoryId;
		Categoria.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Category deleted'
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