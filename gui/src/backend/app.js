const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const planRoutes = require('./api/routes/planes');
const categoriaRoutes = require('./api/routes/categorias');
const anuncioRoutes = require('./api/routes/anuncios');
const compraRoutes = require('./api/routes/compras');
const comentarioRoutes = require('./api/routes/comentarios');

mongoose.connect('mongodb://localhost/baches');
mongoose.Promise = global.Promise;

app.set('view engine','jade');

app.get('/',function(req,res){
	res.render('main');
});

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use('/profilePictures',express.static('profilePictures'));
app.use('/react',express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers',
		'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
		);
	res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');

	console.log(req.body);

	next();
});

app.options("/*",function(req,res,next){
	res.sendStatus(200);
});

app.use('/usuarios',userRoutes);
app.use('/planes',planRoutes);
app.use('/categorias',categoriaRoutes);
app.use('/anuncios', anuncioRoutes);
app.use('/compras', compraRoutes);
app.use('/comentarios', comentarioRoutes);

app.use((req,res,next)=>{
	const error = new Error('Page Not found');
	error.status = 404;
	next(error);
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;
