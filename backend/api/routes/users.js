const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null,'./profilePictures/');
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

router.get('/', User.show);
router.post('/', upload.single('foto'), User.create);
router.get('/:userId',User.find);
router.post('/Update/:userId',User.update);
router.post('/Delete/:userId',User.delete);

module.exports = router;