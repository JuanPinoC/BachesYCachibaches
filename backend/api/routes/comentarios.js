const express = require('express');
const router = express.Router();

const Comentario = require('../controllers/comentarioController');

router.get('/find', Comentario.find);
router.post('/update',Comentario.update);
router.post('/delete',Comentario.delete);
router.get('/', Comentario.show);
router.post('/', Comentario.create);

module.exports = router;