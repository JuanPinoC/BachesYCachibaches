const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const Plan = require('../controllers/planController');

router.get('/find',checkAuth, Plan.find);
router.post('/update',checkAuth,Plan.update);
router.post('/delete',checkAuth,Plan.delete);
router.get('/',checkAuth, Plan.show);
router.post('/',checkAuth, Plan.create);

module.exports = router;