const mongoose = require('mongoose');
const Anuncio = require('../models/anuncio');
const AccessControl = require('accesscontrol');

const ac = new AccessControl();

ac.grant('guest')
		.readAny('anuncio')
	.grant('owner')
		.extend('guest')
		.createOwn('anuncio')
		.updateOwn('anuncio')
		.deleteOwn('anuncio')
	.grant('admin')
		.extend('guest')
		.updateAny('anuncio')
		.deleteAny('anuncio');

module.exports = (req, res, next) => {

	try{
			url = req.url;
			method = req.method;
			tipoUsuario = (req.userData)? req.userData.tipo : 'guest';
			accessGranted = false;

			if(method == "GET"){
				
				permission = ac.can(tipoUsuario).readAny('anuncio');

			}else if(method == "POST"){

				switch(url){
					case '/search':
						permission = ac.can(tipoUsuario).readAny('anuncio');
						break;
					case '/edit':
						permission = ac.can(tipoUsuario).readAny('anuncio');
						break;
					case '/update':
						permission = ac.can(tipoUsuario).updateOwn('anuncio');

						Anuncio.findById(req.body._id)
								.select('usuario')
								.exec()
								.then(doc => {
									if(doc.usuario == req.userData.userId && permission.granted){
									    next();
									} else {
										res.status(403).end();
									}
								})
								.catch(err => {
									res.status(500).end();
								});
						break;
					case '/delete':
						permission = ac.can(tipoUsuario).deleteOwn('anuncio');
						Anuncio.findById(req.body.anuncioId)
								.select('usuario')
								.exec()
								.then(doc => {
									if(doc.usuario == req.userData.userId && permission.granted){
									    next();
									} else {
										res.status(403).end();
									}
								})
								.catch(err => {
									res.status(500).end();
								});
						break;
					case '/highlight':
						permission = ac.can(tipoUsuario).updateOwn('anuncio');
						Anuncio.findById(req.body.anuncioId)
								.select('usuario')
								.exec()
								.then(doc => {
									if(doc.usuario == req.userData.userId && permission.granted){
									    next();
									} else {
										res.status(403).end();
									}
								})
								.catch(err => {
									res.status(500).end();
								});
						break;
					case '/':
						permission = ac.can(tipoUsuario).createOwn('anuncio');
				}
			}

		if(permission.granted){
			next();
		} else {
			res.status(403).end();
		}
		
	}catch(error){
		console.log("Server error");
		res.status(500).end();
	}
};