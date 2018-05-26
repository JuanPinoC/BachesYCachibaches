const express = require('express');
const router = express.Router();
const multer = require('multer');
const Anuncio = require('../controllers/anuncioController');

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

router.get('/find/', Anuncio.find);
router.post('/update/', upload.single('imagen'), Anuncio.update);
router.post('/delete/',Anuncio.delete);
router.get('/', Anuncio.show);
router.post('/', upload.single('imagen'),Anuncio.create);


module.exports = router;