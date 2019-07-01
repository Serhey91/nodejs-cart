const express = require('express');
const router = express.Router()
const { postAddProduct, getAddProduct, getAdminProducts, getEditProduct, postEditProduct, postDeleteProduct } = require('../controllers/admin')

//admin/add-product GET
router.get('/add-product', getAddProduct)

//admin/add-product POST
router.post('/add-product', postAddProduct)

router.get('/edit-product/:id', getEditProduct)

router.post('/edit-product', postEditProduct)

router.post('/delete-product', postDeleteProduct)
//admin/products GET
router.get('/products', getAdminProducts)

module.exports = router;
