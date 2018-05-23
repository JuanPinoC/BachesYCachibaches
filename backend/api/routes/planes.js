const express = require('express');
const router = express.Router();

const Plan = require('../models/plan');

router.get('/', Plan.show);
router.post('/', Plan.create);
router.get('/:planId',Plan.find);
router.post('/Update/:planId',Plan.update);
router.post('/Delete/:planId',Plan.delete);

module.exports = router;