const express = require('express');
const router = express.Router();

const Comentario = require('../controllers/comentarioController');

router.get('/', Comentario.show);
router.post('/', Comentario.create);
router.get('/:comentarioId', Comentario.find);
router.post('/Update/:comentarioId',Comentario.update);
router.post('/Delete/:comentarioId',Comentario.delete);

module.exports = router;