const express = require('express');
const router = express.Router();

const Categoria = require('../models/categoria');

router.get('/', Categoria.show);
router.post('/', Categoria.create);
router.get('/:categoryId', Categoria.find);
router.post('/Update/:categoryId', Categoria.update);
router.post('/Delete/:categoryId', Categoria.delete);

module.exports = router;