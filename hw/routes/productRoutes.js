const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProduct);
router.get('/add', productController.showAddProductForm);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/edit/:id', productController.showEditProductForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);
router.get('/products/:id', productController.showProductDetail);

module.exports = router;
