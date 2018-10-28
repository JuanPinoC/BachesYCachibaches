const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');
const userAccessControl = require('../middlewares/user-access-control');

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
	const img = file.mimetype.toLowerCase();
	console.log(img);
	if (img === 'image/jpeg' || img === 'image/png') {
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

router.post('/password', userAccessControl, User.password);
router.post('/login',User.login);
router.get('/find',checkAuth, userAccessControl, User.find);
router.post('/search',checkAuth, userAccessControl, User.search);
router.get('/menu',checkAuth, userAccessControl, User.menu);
router.get('/edit',checkAuth, userAccessControl, User.edit);
router.get('/getUserById', checkAuth, userAccessControl, User.getUserById);
router.post('/update',checkAuth, upload.single('foto'), userAccessControl, User.update);
router.get('/delete',checkAuth, userAccessControl, User.delete);
router.get('/',checkAuth, userAccessControl, User.show);
router.post('/', upload.single('foto'), userAccessControl, User.create);

module.exports = router;