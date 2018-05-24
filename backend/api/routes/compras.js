const express = require('express');
const router = express.Router();

const Compra = require('../controllers/compraController');

router.get('/', Compra.show);
router.post('/',Compra.create);
router.get('/:compraId',Compra.find);
router.post('/Update/:compraId',Compra.update);
router.post('/Delete/:compraId',Compra.delete);

module.exports = router;