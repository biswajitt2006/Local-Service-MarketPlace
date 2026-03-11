const Provider = require('../models/Provider');
const Category = require('../models/Category');
const { rankProviders } = require('../utils/recommendationEngine');

/**
 * @desc    Get all providers (with optional filters & pagination)
 * @route   GET /api/providers
 * @access  Public
 */
exports.getProviders = async (req, res, next) => {
  try {
    const { category, rating, price, distance, lat, lng, page = 1, limit = 10, sort } = req.query;
    const filter = {};

    // Category filter (by name → resolve to id)
    if (category) {
      const cat = await Category.findOne({ name: { $regex: new RegExp(category, 'i') } });
      if (cat) filter.categoryId = cat._id;
    }

    // Minimum rating filter
    if (rating) {
      filter.ratingAverage = { $gte: Number(rating) };
    }

    // Max price filter
    if (price) {
      filter.pricePerHour = { $lte: Number(price) };
    }

    // Sorting
    let sortOption = {};
    if (sort === 'rating') sortOption = { ratingAverage: -1 };
    else if (sort === 'price_asc') sortOption = { pricePerHour: 1 };
    else if (sort === 'price_desc') sortOption = { pricePerHour: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [providers, total] = await Promise.all([
      Provider.find(filter)
        .populate('userId', 'name email phone')
        .populate('categoryId', 'name')
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Provider.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: providers.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: providers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single provider by ID
 * @route   GET /api/providers/:id
 * @access  Public
 */
exports.getProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .populate('userId', 'name email phone location')
      .populate('categoryId', 'name description');

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    res.json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create provider profile
 * @route   POST /api/providers
 * @access  Private (provider)
 */
exports.createProvider = async (req, res, next) => {
  try {
    // Prevent duplicates
    const existing = await Provider.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Provider profile already exists' });
    }

    const provider = await Provider.create({ ...req.body, userId: req.user._id });

    res.status(201).json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update provider profile
 * @route   PUT /api/providers/:id
 * @access  Private (provider owner)
 */
exports.updateProvider = async (req, res, next) => {
  try {
    let provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    // Only owner or admin can update
    if (provider.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorised to update this profile' });
    }

    provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: provider });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get AI-recommended providers
 * @route   GET /api/providers/recommendations
 * @access  Public
 */
exports.getRecommendations = async (req, res, next) => {
  try {
    const { category, lat, lng } = req.query;
    const filter = {};

    if (category) {
      const cat = await Category.findOne({ name: { $regex: new RegExp(category, 'i') } });
      if (cat) filter.categoryId = cat._id;
    }

    const providers = await Provider.find(filter)
      .populate('userId', 'name email phone')
      .populate('categoryId', 'name')
      .lean();

    const ranked = rankProviders(providers, Number(lat), Number(lng));

    res.json({ success: true, count: ranked.length, data: ranked });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Provider dashboard
 * @route   GET /api/providers/dashboard/:providerId
 * @access  Private (provider)
 */
exports.getProviderDashboard = async (req, res, next) => {
  try {
    const Booking = require('../models/Booking');

    const providerId = req.params.providerId;
    const provider = await Provider.findById(providerId);

    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    const [incomingBookings, completedJobs, allBookings] = await Promise.all([
      Booking.find({ providerId, status: { $in: ['pending', 'accepted'] } })
        .populate('userId', 'name email phone')
        .sort({ serviceDate: 1 })
        .lean(),
      Booking.find({ providerId, status: 'completed' })
        .populate('userId', 'name email')
        .sort({ updatedAt: -1 })
        .lean(),
      Booking.find({ providerId, status: 'completed' }).lean(),
    ]);

    const totalEarnings = allBookings.reduce((sum, b) => sum + (b.price || 0), 0);

    res.json({
      success: true,
      data: {
        incomingBookings,
        completedJobs,
        earnings: { total: totalEarnings, jobsCount: allBookings.length },
        averageRating: provider.ratingAverage,
        totalReviews: provider.totalReviews,
      },
    });
  } catch (error) {
    next(error);
  }
};
