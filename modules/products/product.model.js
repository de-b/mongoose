const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    stars: Number,
    message: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    name: String,
    desctiption: String,
    price: Number,
    images: [String],
    category: {
      type: String,
      required: true,
    },
    color: String,
    brand: String,
    size: String,
    condition: {
      type: String,
      enum: ['brand new', 'used', 'refurbished'],
      default: 'brand new',
    },
    status: {
      type: String,
      enum: ['available', 'out of stock', 'booked'],
      default: 'available',
    },
    SKU: String,
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    warranty: {
      type: Boolean,
    },
    warrantyPeriod: String,
    discount: {
      discountedItem: Boolean,
      discountType: String,
      discountValue: String,
    },
    tags: [String],
    reviews: [ReviewSchema],
    couponCode: String,
    offers: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', ProductSchema);
