const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add new product',
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res, next) => {
    const { title, description, imageUrl, price } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin products page',
            path: '/admin/products',
            products
        })
    })
}