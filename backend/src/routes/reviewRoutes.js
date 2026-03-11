const router = require('express').Router();
const { createReview, getProviderReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public
router.get('/provider/:providerId', getProviderReviews);

// Protected
router.post('/', protect, authorize('customer'), createReview);

module.exports = router;
