const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const defaultPicture = 'profilePictures\\default.jpeg';
const User = require('../models/user');
const jwt = require('jsonwebtoken');
	
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
		const id = req.userData.userId;
		User.findById(id)
			.select('nombres apellidos email puntuacion foto _id')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						user: doc,
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
		const id = req.userData.userId;
		const obj = req.body;
		delete obj.userId;
		delete obj.contrasenia;
		if (req.file !== undefined) {
			User.findById(id)
			.select('foto')
			.exec()
			.then(doc=>{
				if (doc.foto !== defaultPicture) {
					fs.unlink(doc.foto , (err) => {
						  if (err) {
								if (err.code === 'ENOENT'){
									User.update({_id:id},{$set: {foto:defaultPicture}})
									.exec();
								}
							}else{
								console.log(doc.foto+' was deleted');
							}  
						});
				}
				User.update({_id: id},{$set:{foto:req.file.path}})
				.exec();
			})
			.catch(err=>{throw err});
		}



		delete obj.foto;
		User.update({_id: id},{$set: obj})
			.exec()
			.then(result => {
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
		const id = req.userData.userId;
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
	},
	password: (req,res,next)=>{
		const email = req.body.email;
		const contrasenia = req.body.contrasenia;
		User.find({email: email})
			.exec()
			.then(user => {
				if (user.length < 1) {
					return res.status(409).json({
						message: 'Email does not exist'
					});
				}else{
					bcrypt.hash(contrasenia, 10, (err,hash)=>{
						if (err) throw err;
						User.update({email: email},{$set: {contrasenia: hash}})
							.exec();
							console.log('Contraseña actualizada');
					});
				}
				res.status(201).json({
					message: 'Password Updated'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	login: (req,res,next)=>{
		User.find({ email: req.body.email})
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Auth failed'
				});
			}
			bcrypt.compare(req.body.contrasenia, user[0].contrasenia, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Auth failed'
					});
				}
				if (result) {
					const token = jwt.sign(
					{
						email: user[0].email,
						userId: user[0]._id
					},
					//process.env.JWT_KEY,
					'secret',
					{
						expiresIn: "2h"
					}
					);
					return res.status(200).json({
						message: 'Auth succesful',
						token: token,
						headers: req.headers
					});
				}
				res.status(401).json({
					message: 'Auth failed'
				});
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
	},
	edit:(req,res,next)=>{
		User.findById(req.userData.userId)
			.select('_id telefono celular direccion puntuacion latitud longitud foto nombres apellidos email')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						usuario: doc
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
	menu:(req,res,next)=>{
		User.findById(req.userData.userId)
			.select('nombres foto email _id')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						usuario: doc
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
	getUserById:(req,res,next)=>{
		User.findById(req.query.userId)
			.select('_id telefono celular direccion puntuacion latitud longitud foto nombres apellidos email')
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						usuario: doc
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
	search:(req,res,next)=>{
		const string = req.body.string;
		User.find({nombres:{ $regex: string , $options:'i'}})
			.select('_id telefono celular direccion puntuacion latitud longitud foto nombres apellidos email')
			.exec()
			.then(docs => {
				if (docs.length == []) {
					res.status(404).json({message:'No entries found'})
				}
				res.status(200).json({
					count: docs.length,
					result: docs.map(doc => {
						return {
							_id: doc._id,
							telefono: doc.telefono,
							celular: doc.celular,
							direccion: doc.direccion,
							puntuacion: doc.puntuacion,
							latitud: doc.latitud,
							longitud: doc.longitud,
							foto: doc.foto,
							nombres: doc.nombres,
							apellidos: doc.apellidos,
							email: doc.email
						}
					})
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({error:err});
			});
	}
}