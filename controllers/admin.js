const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add new product',
        path: '/admin/add-product',
        editing: false,
    })
}

exports.postAddProduct = (req, res, next) => {
    const {
        title,
        description,
        imageUrl,
        price
    } = req.body;
    //SEQUELIZE
    Product.create({
            title,
            price,
            imageUrl,
            description
        }).then(() => {
            console.log('Added product')
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

    //MYSQL
    // const product = new Product(null, title, imageUrl, description, price);
    // product.save()
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit // queryParams
    if (!editMode) {
        return res.redirect('/')
    }
    Product.findByPk(req.params.id)
    .then(product => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            product
        })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const {
        productId,
        title,
        description,
        imageUrl,
        price
    } = req.body;
    Product.findByPk(productId)
    .then(product => {
        product.title = title;
        product.description = description;
        product.imageUrl = imageUrl;
        product.price = price;
        return product.save(); //will create if no exist with such
    })
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const {
        productId
    } = req.body;
    Product.findByPk(productId)
    .then(product => product.destroy())
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err))
}

exports.getAdminProducts = (req, res, next) => {
    //SEQUELIZE
    Product.findAll().then(products => {
        res.render('admin/products', {
            pageTitle: 'Admin products page',
            path: '/admin/products',
            products
        })
    })
    .catch(err => console.log(err));
    //MYSQL
    // Product.fetchAll()
    //     .then(([rows, field]) => {
    //         res.render('admin/products', {
    //             pageTitle: 'Admin products page',
    //             path: '/admin/products',
    //             products: rows
    //         })
    //     })
    //     .catch(err => console.log(err));

}