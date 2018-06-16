const mongoose = require('mongoose');
const Plan = require('../models/plan');

module.exports = {
	show: (req,res,next)=> {
		Plan.find()
			.select('_id porcentaje tiempo precio')
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					plan: docs.map(doc=>{
						return{
							porcentaje: doc.porcentaje,
							tiempo: doc.tiempo,
							precio: doc.precio,
							_id: doc._id
						}
					})
				};
				res.status(200).json(response);
			})
			.catch(err=>{
				console.log(err);
				res.status(500).json({
					error:err
				});
			});
	},
	create: (req,res,next)=>{
		const plan = new Plan({
			_id: new mongoose.Types.ObjectId(),
			porcentaje: req.body.porcentaje,
			tiempo: req.body.tiempo,
			precio: req.body.precio
		});
		plan
			.save()
			.then(result => {
				console.log(result);
				res.status(201).json({
					message: 'Created plan succesfully',
					createdPLan: {
						porcentaje: result.porcentaje,
						tiempo: result.tiempo,
						precio: result.precio,
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
	find: (req,res,next)=>{
		const id = req.body.planId;
		Plan.findById(id)
			.select('porcentaje tiempo precio _id')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						plan: doc,
					});
				}else{
					res.status(404).json({message: 'No valid entry found for provided ID'});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	update: (req,res,next)=>{
		const id = req.body.planId;
		const updateOps = {};
		for(const ops of req.body){
			updateOps[ops.propName] = ops.value;
		}
		Plan.update({_id: id},{$set: updateOps })
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Product updated'
				});
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	delete: (req,res,next)=>{
		const id = req.body.planId;
		Plan.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Plan deleted'
				});
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
}