const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Please add your hourly rate'],
      min: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    servicesOffered: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Index for geo-based and category queries
providerSchema.index({ categoryId: 1 });
providerSchema.index({ ratingAverage: -1 });

module.exports = mongoose.model('Provider', providerSchema);
