const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
    default: '/images/default-product.svg',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
