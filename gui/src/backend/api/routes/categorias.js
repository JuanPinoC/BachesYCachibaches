const express = require('express');
const router = express.Router();

const Categoria = require('../controllers/categoriaController');

router.get('/find', Categoria.find);
router.post('/update', Categoria.update);
router.post('/delete', Categoria.delete);
router.get('/', Categoria.show);
router.post('/', Categoria.create);

module.exports = router;