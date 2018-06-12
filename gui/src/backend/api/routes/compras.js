const express = require('express');
const router = express.Router();

const Compra = require('../controllers/compraController');

router.get('/find',Compra.find);
router.post('/update',Compra.update);
router.post('/delete',Compra.delete);
router.get('/', Compra.show);
router.post('/',Compra.create);

module.exports = router;