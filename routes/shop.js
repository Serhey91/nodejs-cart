const express = require('express');
const router = express.Router();
const { getProducts, getIndex, getCart, getCheckout, postOrder, getOrders, getCurrentProduct, postCart, deleteCartItem } = require('../controllers/shop')

router.get('/', getIndex)

router.get('/products', getProducts)

router.get('/cart', getCart)

router.post('/cart', postCart)

router.get('/checkout', getCheckout)

router.get('/orders', getOrders)

router.post('/create-order', postOrder)

router.get('/products/:id', getCurrentProduct)

router.post('/cart-delete-item', deleteCartItem)
module.exports = router