const router = require('express').Router();
const { getDashboard } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, authorize('customer'), getDashboard);

module.exports = router;
