const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const Comentario = require('../controllers/comentarioController');

router.get('/find', Comentario.find);
router.post('/update',checkAuth,Comentario.update);
router.post('/delete',checkAuth,Comentario.delete);
router.get('/', Comentario.show);
router.post('/',checkAuth, Comentario.create);

module.exports = router;