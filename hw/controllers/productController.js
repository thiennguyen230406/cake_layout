const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('index', { products, query: '' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading products');
  }
};

exports.showAddProductForm = (req, res) => {
  res.render('add');
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const newProduct = new Product({
      name,
      price: Number(price),
      quantity: Number(quantity),
      image: req.file ? `/uploads/${req.file.filename}` : '/images/default-product.svg',
    });

    await newProduct.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding product');
  }
};

exports.showEditProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('edit', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading product');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const updateData = {
      name,
      price: Number(price),
      quantity: Number(quantity),
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating product');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product');
  }
};

exports.showProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('show', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading product detail');
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const query = req.query.q || '';
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).sort({ createdAt: -1 });

    res.render('index', { products, query });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching products');
  }
};
