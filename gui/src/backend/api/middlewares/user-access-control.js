const AccessControl = require('accesscontrol');

const ac = new AccessControl();

ac.grant('guest')
		.createAny('user')
		.updateAny('password')
	.grant('owner')
		.readAny('user')
		.updateOwn('user')
		.deleteOwn('user')
	.grant('admin')
		.readAny('user')
		.updateAny('user')
		.deleteAny('user');

module.exports = (req, res, next) => {

	try{
			url = req.url;
			method = req.method;			
			tipoUsuario = req.userData.tipo || 'guest';
			accessGranted = false;

			if(method == "GET"){
				switch(url){
					case '/find':
						permission = ac.can(tipoUsuario).readAny('user');
						break;
					case '/menu':
						permission = ac.can(tipoUsuario).readAny('user');
						break;
					case '/edit':
						permission = ac.can(tipoUsuario).readOwn('user');
						break;
					case '/getUserById':
						permission = ac.can(tipoUsuario).readAny('user');
						break;
					case '/delete':
						permission = ac.can(tipoUsuario).deleteOwn('user');
						break;
					case '/':
						permission = ac.can(tipoUsuario).readAny('user');
						break;
				}
					
			}else if(method == "POST"){
				switch(url){
					case '/password':
						permission = ac.can(tipoUsuario).updateAny('password');
						break;
					case '/search':
						permission = ac.can(tipoUsuario).readAny('user');
						break;
					case '/update':
						permission = ac.can(tipoUsuario).updateOwn('user');
						break;
					case '/':
						permission = ac.can(tipoUsuario).createAny('user');

				}
			}

			if(permission.granted){
				next();
			} else {
				res.status(403).end();
			}

	}catch(error){
		console.log("Server error: " + error);
		res.status(500).end();
	}
};