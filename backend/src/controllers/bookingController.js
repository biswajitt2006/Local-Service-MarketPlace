const Booking  = require('../models/Booking');
const Provider = require('../models/Provider');

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private (customer)
 */
exports.createBooking = async (req, res, next) => {
  try {
    const { providerId, serviceDate, serviceTime, address, description, price } = req.body;

    // Validate provider exists
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      providerId,
      serviceDate,
      serviceTime,
      address,
      description,
      price: price || provider.pricePerHour,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings for a user
 * @route   GET /api/bookings/user/:userId
 * @access  Private
 */
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate({
        path: 'providerId',
        populate: [
          { path: 'userId', select: 'name email phone' },
          { path: 'categoryId', select: 'name' },
        ],
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings for a provider
 * @route   GET /api/bookings/provider/:providerId
 * @access  Private (provider)
 */
exports.getProviderBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ providerId: req.params.providerId })
      .populate('userId', 'name email phone')
      .sort({ serviceDate: 1 })
      .lean();

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id/status
 * @access  Private (provider / admin)
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'accepted', 'completed', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;

    // Auto-mark payment when completed
    if (status === 'completed') {
      booking.paymentStatus = 'paid';
    }

    await booking.save();

    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};
