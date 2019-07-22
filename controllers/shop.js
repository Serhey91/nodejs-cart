const Product = require('../models/product');
// const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {
            products,
            pageTitle: 'Products',
            path: '/products'
        })
    });   
}


exports.getCurrentProduct = (req, res, next) => {
    const prodId = req.params.id;
    Product.fetchOne(prodId)
    .then(item => {
        res.render('shop/product-detail', {
            product: item,
            pageTitle: 'Product detail page',
            path: `/products`
        })
    })
    
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {
            products,
            pageTitle: 'Shop',
            path: '/'
        })
    })
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(products => {
        res.render('shop/cart', { // render page - ejs/pug etc
            pageTitle: 'Your Cart',
            path: '/cart', //route that will handle it,
            products,            
        });
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.id;
    Product.fetchOne(productId)
    .then(prod => req.user.addToCart(prod))
    .then(result => res.redirect('/cart'))
    .catch(error => console.log(error))
}

exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
    .then(() => {
        res.redirect('/cart')
    })
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
    .then(orders => {
        res.render('shop/orders', { // render page - ejs/pug etc
            pageTitle: 'Your Orders',
            path: '/orders', //route that will handle it,
            orders,
        })
    })
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
    .then(data => {
        res.redirect('/orders')
    })
    .catch(error => console.log(error))
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { // render page - ejs/pug etc
        pageTitle: 'Checkout your order',
        path: '/checkout' //route that will handle it
    })
}