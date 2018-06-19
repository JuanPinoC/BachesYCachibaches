const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

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
	if (file.mimeType === 'image/jpeg' || file.mimetype === 'image/png') {
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

router.post('/password',User.password);
router.post('/login',User.login);
router.get('/find',checkAuth, User.find);
router.post('/update',checkAuth, upload.single('foto'), User.update);
router.post('/delete',checkAuth, User.delete);
router.get('/',checkAuth, User.show);
router.post('/', upload.single('foto'), User.create);

module.exports = router;