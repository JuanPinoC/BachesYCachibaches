const express = require('express');
const router = express.Router();
const multer = require('multer');
const Anuncio = require('../controllers/anuncioController');
const checkAuth = require('../middlewares/check-auth');
const accessControl = require('../middlewares/anuncio-access-control');


const storage = multer.diskStorage({
	destination: function(req, file, cb){
		console.log("file: " + file);
		cb(null,'./uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
	}
});

const fileFilter = (req,file,cb) => {
	//reject a 
	const img = file.mimetype.toLowerCase();
	console.log(img);
	if (img === 'image/png' || img === 'image/jpeg') {
		cb(null, true);	
	}else{
		cb(null,false);
	}
};

const upload = multer({
	storage: storage, 
	limits: {
		fileSize: 1024 * 1024 * 5 
	},
	fileFilter: fileFilter
});

//router.use(accessControl);

router.get('/test', Anuncio.test);
router.get('/find', Anuncio.find);
router.post('/search', checkAuth, accessControl,Anuncio.search);
router.post('/edit', checkAuth, accessControl, Anuncio.edit);
router.post('/update', checkAuth, upload.array('imagen',10), accessControl, Anuncio.update);
router.post('/delete', checkAuth, accessControl, Anuncio.delete);
router.post('/highlight', checkAuth, accessControl, Anuncio.highlight);
router.get('/categoria', Anuncio.listByCategory);
router.get('/subcategoria', Anuncio.listBySubCategory);
router.get('/usuario', checkAuth,Anuncio.listByTokken);
router.get('/listById', checkAuth,Anuncio.listById);
router.get('/', Anuncio.show);
router.post('/', checkAuth, upload.array('imagen',10),Anuncio.create);

module.exports = router;