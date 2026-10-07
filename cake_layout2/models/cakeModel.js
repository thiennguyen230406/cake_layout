const pool = require('../config/database');

function formatPrice(value) {
  if (value === null || value === undefined) return null;
  return `${Number(value).toLocaleString('vi-VN')} d`;
}

function mapProduct(row) {
  return {
    id: row.id,
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
  const [rows] = await pool.execute(
    `SELECT id, name, image_url, price, old_price, is_sale, detail_url, product_type
     FROM products
     WHERE product_type = ?
     ORDER BY id ASC`,
    [productType]
  );

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