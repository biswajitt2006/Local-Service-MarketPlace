const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate reviews per booking
reviewSchema.index({ bookingId: 1 }, { unique: true });

/**
 * After saving a review, recalculate the provider's
 * ratingAverage and totalReviews.
 */
reviewSchema.post('save', async function () {
  const Provider = mongoose.model('Provider');

  const stats = await this.constructor.aggregate([
    { $match: { providerId: this.providerId } },
    {
      $group: {
        _id: '$providerId',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Provider.findByIdAndUpdate(this.providerId, {
      ratingAverage: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].count,
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);
