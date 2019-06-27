const express = require('express');
const router = express.Router()
const { postAddProduct, getAddProduct, getAdminProducts } = require('../controllers/admin')

//admin/add-product GET
router.get('/add-product', getAddProduct)

//admin/add-product POST
router.post('/add-product', postAddProduct)

//admin/products GET
router.get('/products', getAdminProducts)

module.exports = router;
