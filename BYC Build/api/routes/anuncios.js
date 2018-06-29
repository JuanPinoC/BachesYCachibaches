const express = require('express');
const router = express.Router();
const multer = require('multer');
const Anuncio = require('../controllers/anuncioController');
const checkAuth = require('../middlewares/check-auth');


const storage = multer.diskStorage({
	destination: function(req, file, cb){
		console.log("file: " + file);
		cb(null,'./static/uploads/');
	},
	filename: function(req, file, cb){
		cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
	}
});

const fileFilter = (req,file,cb) => {
	//reject a file
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
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

router.get('/find', Anuncio.find);
router.post('/search',Anuncio.search);
router.post('/edit',checkAuth, Anuncio.edit);
router.post('/update',checkAuth, upload.array('imagen',10), Anuncio.update);
router.post('/delete',checkAuth, Anuncio.delete);
router.post('/highlight',checkAuth, Anuncio.highlight);
router.get('/categoria',Anuncio.listByCategory);
router.get('/subcategoria',Anuncio.listBySubCategory);
router.get('/usuario',checkAuth,Anuncio.listByTokken);
router.get('/listById',checkAuth,Anuncio.listById);
router.get('/', Anuncio.show);
router.post('/',checkAuth, upload.array('imagen',10),Anuncio.create);

module.exports = router;