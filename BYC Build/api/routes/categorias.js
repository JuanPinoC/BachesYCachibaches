const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const Categoria = require('../controllers/categoriaController');

router.get('/find', Categoria.find);
router.post('/update',checkAuth, Categoria.update);
router.post('/delete',checkAuth, Categoria.delete);
router.get('/', Categoria.show);
router.post('/',checkAuth, Categoria.create);

module.exports = router;