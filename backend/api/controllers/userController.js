const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const defaultPicture = '/profilePictures/default.jpeg';
const User = require('../models/user');

module.exports = {
	show: (req,res,next)=>{
		User.find()
			.select('nombres apellidos email puntuacion foto _id')
			.exec()
			.then(docs =>{
				const response = {
					count: docs.length,
					users: docs.map(doc=>{
						return{
							nombres: doc.nombres,
							apellidos: doc.apellidos,
							email: doc.email,
							puntuacion: doc.puntuacion,
							foto: doc.foto,
							_id: doc._id
						}
					})
				};
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error:err
				});
			});		
	},
	create: (req,res,next)=>{
		User.find({email: req.body.email})
		.exec()
		.then(user => {
			if (user.length >=1) {
				return res.status(409).json({
					message: 'Mail exists'
				});
			}else{
				bcrypt.hash(req.body.contrasenia, 10, (err,hash)=>{
					if (err) {
						return res.status(500).json({
							error:err
						});
					}else{
						const foto = req.file === undefined ? defaultPicture : req.file.path;
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							nombres: req.body.nombres,
							apellidos: req.body.apellidos,
							telefono: req.body.telefono,
							celular: req.body.celular,
							direccion: req.body.direccion,
							email: req.body.email,
							puntuacion: req.body.puntuacion,
							latitud: req.body.latitud,
							longitud: req.body.longitud,
							foto: foto,
							contrasenia: hash
						});
						user 
							.save()
							.then(result => {
								console.log(result);
								res.status(201).json({
									message: 'User succesfully created',
									createdUser: {
										nombres: result.name,
										apellidos: result.name,
										email: result.email,
										foto: result.foto,
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
					}
				})
			}
		})
	},
	find: (req,res,next)=>{
		const id = req.params.userId
		User.findById(id)
			.select('nombres apellidos email puntuacion foto _id')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						product: doc,
					});
				}else{
					res.status(404).json({message:'No valid entry found for provided ID'});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({error: err});
			})
	},
	update: (req,res,next)=>{
		const id = req.params.userId;
		const updateOps = {};
		for(const ops of req.body){
			updateOps[ops.propName] = ops.value;
		}
		console.log(req.body);
		console.log(updateOps);
		User.update({_id: id},{$set: updateOps})
			.exec()
			.then(result => {
				console.log(result);
				res.status(200).json({
					message: 'User updated'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error:err
				});
			});
	},
	delete: (req,res,next)=>{
		const id = req.params.userId;
		User.findById(id)
			.select('foto')
			.exec()
			.then(doc =>{
				if (!doc) {
					return res.status(404).json({
						message: "User not found"
					});
				}else{
					if (doc.foto !== defaultPicture) {
						fs.unlink(doc.foto , (err) => {
						  if (err) throw err;
						  console.log(doc.foto+' was deleted');
						});
					}
					User.remove({_id: id})
						.exec()
						.then(result => {
							res.status(200).json({
								message: 'User deleted',
							});
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