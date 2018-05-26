const express = require('express');
const router = express.Router();

const Plan = require('../controllers/planController');

router.get('/find',Plan.find);
router.post('/update',Plan.update);
router.post('/delete',Plan.delete);
router.get('/', Plan.show);
router.post('/', Plan.create);

module.exports = router;