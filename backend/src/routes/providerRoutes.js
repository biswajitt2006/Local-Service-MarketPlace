const router = require('express').Router();
const {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  getRecommendations,
  getProviderDashboard,
} = require('../controllers/providerController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public
router.get('/', getProviders);
router.get('/recommendations', getRecommendations);

// Protected
router.post('/', protect, authorize('provider'), createProvider);
router.get('/dashboard/:providerId', protect, authorize('provider', 'admin'), getProviderDashboard);

// Must come after static routes to avoid ":id" swallowing "recommendations"/"dashboard"
router.get('/:id', getProvider);
router.put('/:id', protect, authorize('provider', 'admin'), updateProvider);

module.exports = router;
