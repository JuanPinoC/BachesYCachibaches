const express = require('express');
const router = express.Router();
const multer = require('multer');
const Anuncio = require('../models/anuncio');

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
	if (file.mimeType === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
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

router.get('/', Anuncio.show);
router.post('/:userId', upload.single('imagen'),Anuncio.create);
router.get('/:anuncioId', Anuncio.find);
router.post('/Update/:anuncioId',Anuncio.update);
router.post('/Delete/:anuncioId',Anuncio.delete);

module.exports = router;