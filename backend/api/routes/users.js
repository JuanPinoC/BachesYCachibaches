const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', User.show);
router.post('/', User.create);
router.get('/:userId',User.find);
router.post('/Update/:userId',User.update);
router.post('/Delete/:userId',User.delete);

module.exports = router;