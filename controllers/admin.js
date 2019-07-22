const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add new product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const {title, description, imageUrl, price} = req.body;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit; // queryParams
    if (!editMode) {
        return res.redirect('/');
    }
    Product.findProductById(req.params.id, (product) => {
        if (!product) return res.redirect('/');
        res.render('admin/edit-product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            product,
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const {productId, title, description, imageUrl, price} = req.body;
    const product = new Product(productId, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const {productId} = req.body;
    Product.delete(productId);
    res.redirect('/admin/products');
};

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            pageTitle: 'Admin products page',
            path: '/admin/products',
            products,
        });
    });
};
