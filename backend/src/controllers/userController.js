const Booking = require('../models/Booking');
const Review  = require('../models/Review');

/**
 * @desc    Get user dashboard data
 * @route   GET /api/users/dashboard
 * @access  Private (customer)
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [upcomingBookings, pastBookings, reviewsGiven] = await Promise.all([
      Booking.find({
        userId,
        status: { $in: ['pending', 'accepted'] },
        serviceDate: { $gte: new Date() },
      })
        .populate({
          path: 'providerId',
          populate: [
            { path: 'userId', select: 'name email phone' },
            { path: 'categoryId', select: 'name' },
          ],
        })
        .sort({ serviceDate: 1 })
        .lean(),

      Booking.find({
        userId,
        $or: [{ status: 'completed' }, { status: 'cancelled' }],
      })
        .populate({
          path: 'providerId',
          populate: [
            { path: 'userId', select: 'name email' },
            { path: 'categoryId', select: 'name' },
          ],
        })
        .sort({ updatedAt: -1 })
        .lean(),

      Review.find({ userId })
        .populate('providerId', 'bio')
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    // Payment history derived from completed bookings
    const paymentHistory = pastBookings
      .filter((b) => b.status === 'completed')
      .map((b) => ({
        bookingId: b._id,
        amount: b.price,
        status: b.paymentStatus,
        date: b.updatedAt,
      }));

    res.json({
      success: true,
      data: {
        upcomingBookings,
        pastBookings,
        reviewsGiven,
        paymentHistory,
      },
    });
  } catch (error) {
    next(error);
  }
};
