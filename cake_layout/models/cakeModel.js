const mongoose = require('mongoose');

function formatPrice(value) {
  if (value === null || value === undefined) return null;
  return `${Number(value).toLocaleString('vi-VN')} d`;
}

const cakeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image_url: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    old_price: { type: Number, default: null, min: 0 },
    is_sale: { type: Boolean, default: false },
    detail_url: { type: String, default: 'product.html' },
    product_type: { type: String, enum: ['new', 'top'], required: true },
  },
  {
    collection: 'products',
    versionKey: false,
    timestamps: true,
  }
);

const Cake = mongoose.models.Cake || mongoose.model('Cake', cakeSchema);

function mapProduct(row) {
  return {
    id: row._id ? row._id.toString() : null,
    name: row.name,
    image: row.image_url,
    price: formatPrice(row.price),
    oldPrice: formatPrice(row.old_price),
    isSale: row.is_sale,
    detailUrl: row.detail_url,
    productType: row.product_type,
  };
}

async function getProductsByType(productType) {
  const rows = await Cake.find({ product_type: productType }).sort({ _id: 1 }).lean();

  return rows.map(mapProduct);
}

async function getNewProducts() {
  return getProductsByType('new');
}

async function getTopProducts() {
  return getProductsByType('top');
}

module.exports = {
  getNewProducts,
  getTopProducts,
};