const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
	puntuacion: {type:Number, default:100},
	latitud: {type:Number, default: null},
	longitud: {type:Number, default: null},
	contrasenia: {type: String, required: true}
});
User = mongoose.model('User', userSchema,'usuarios');

module.exports = {
	show: (req,res,next)=>{
		User.find()
			.select('nombres apellidos email puntuacion _id')
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
							_id: doc._id,
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
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							nombres: req.body.nombres,
							apellidos: req.body.apellidos,
							email: req.body.email,
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
			.select('nombres apellidos email puntuacion _id')
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
		User.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Product deleted',
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