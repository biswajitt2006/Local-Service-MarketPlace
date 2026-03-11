const User     = require('../models/User');
const Provider = require('../models/Provider');
const Booking  = require('../models/Booking');

/**
 * @desc    Get platform-wide admin statistics
 * @route   GET /api/admin/stats
 * @access  Private (admin)
 */
exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalProviders, totalBookings, revenueAgg] = await Promise.all([
      User.countDocuments(),
      Provider.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, totalRevenue: { $sum: '$price' }, count: { $sum: 1 } } },
      ]),
    ]);

    const revenue = revenueAgg.length > 0
      ? { total: revenueAgg[0].totalRevenue, completedBookings: revenueAgg[0].count }
      : { total: 0, completedBookings: 0 };

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProviders,
        totalBookings,
        revenue,
      },
    });
  } catch (error) {
    next(error);
  }
};
