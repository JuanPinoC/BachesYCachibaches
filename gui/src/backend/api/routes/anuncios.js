const express = require('express');
const router = express.Router();
const multer = require('multer');
const Anuncio = require('../controllers/anuncioController');
const checkAuth = require('../middlewares/check-auth')

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null,'./uploads/');
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
router.post('/edit', Anuncio.edit);
router.post('/update', upload.array('imagen',10), Anuncio.update);
router.post('/delete',Anuncio.delete);
router.post('/highlight', Anuncio.highlight);
router.get('/', checkAuth, Anuncio.show);
router.post('/', upload.array('imagen',10),Anuncio.create);


module.exports = router;