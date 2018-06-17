const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const Compra = require('../controllers/compraController');

router.get('/find',checkAuth,Compra.find);
router.post('/update',checkAuth,Compra.update);
router.post('/delete',checkAuth,Compra.delete);
router.get('/',checkAuth, Compra.show);
router.post('/',checkAuth,Compra.create);

module.exports = router;