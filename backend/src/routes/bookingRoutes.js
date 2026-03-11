const router = require('express').Router();
const {
  createBooking,
  getUserBookings,
  getProviderBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All booking routes are protected
router.use(protect);

router.post('/', authorize('customer'), createBooking);
router.get('/user/:userId', getUserBookings);
router.get('/provider/:providerId', authorize('provider', 'admin'), getProviderBookings);
router.put('/:id/status', authorize('provider', 'admin'), updateBookingStatus);

module.exports = router;
