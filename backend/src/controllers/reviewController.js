const Review  = require('../models/Review');
const Booking = require('../models/Booking');

/**
 * @desc    Create a review for a completed booking
 * @route   POST /api/reviews
 * @access  Private (customer)
 */
exports.createReview = async (req, res, next) => {
  try {
    const { providerId, bookingId, rating, comment } = req.body;

    // Verify the booking exists and belongs to the user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You can only review your own bookings' });
    }

    if (booking.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Can only review completed bookings' });
    }

    // Check for duplicate review
    const existing = await Review.findOne({ bookingId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already reviewed this booking' });
    }

    const review = await Review.create({
      userId: req.user._id,
      providerId,
      bookingId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all reviews for a provider
 * @route   GET /api/reviews/provider/:providerId
 * @access  Public
 */
exports.getProviderReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};
