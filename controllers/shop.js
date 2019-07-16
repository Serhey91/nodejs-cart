const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    //SEQUELIZE
    Product.findAll().then(products => {
            res.render('shop/product-list', {
                products,
                pageTitle: 'Products',
                path: '/products'
            })
        })
        .catch(err => console.log(err));

    //MYSQL
    // Product.fetchAll()
    // .then(([rows, field]) => {
    //     res.render('shop/product-list', {
    //         products: rows,
    //         pageTitle: 'Products',
    //         path: '/products'
    //     })
    // })
    // .catch(err => console.log(err));
    // rendering for pug file
    // res.sendFile(path.join(rootDir,  'views', 'shop.html'))
    // res.send('<h1>Hello from express</h1>') //sending html
    // next() => has to be executed for next middleware funtions
} // handling middleware functions - will be for every incoming events

exports.getCurrentProduct = (req, res, next) => {
    const prodId = req.params.id;
    //SEQUELIZE
    // Product.findAll({where: {id: prodId}})
    // .then(products => {
    //     res.render('shop/product-detail', {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path: `/products`
    //     })
    // })
    // .catch(err => console.log(err))

    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product,
                pageTitle: product.title,
                path: `/products`
            })
        })
        .catch(err => console.log(err))

    //MYSQL
    // Product.findProductById(prodId)
    //     .then(([item]) => {
    //         console.log(item)
    //         res.render('shop/product-detail', {
    //             product: item[0],
    //             pageTitle: item[0].title,
    //             path: `/products`
    //         })
    //     })
    //     .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    //SEQUELIZE

    Product.findAll().then(products => {
            res.render('shop/index', {
                products,
                pageTitle: 'Shop',
                path: '/'
            })
        })
        .catch(err => console.log(err));

    //MYSQL
    // Product.fetchAll()
    //     .then(([rows, field]) => {
    //         res.render('shop/index', {
    //             products: rows,
    //             pageTitle: 'Shop',
    //             path: '/'
    //         })
    //     })
    //     .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
        })
        .then(products => {
            res.render('shop/cart', { // render page - ejs/pug etc
                pageTitle: 'Your Cart',
                path: '/cart', //route that will handle it,
                products
            })
        })
        .catch(error => console.log(error))
    //Before sequelize
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = []
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({
    //                     productData: product,
    //                     count: cartProductData.count
    //                 })
    //             }
    //         }
    //         
    //     })
    // })
}

exports.postCart = (req, res, next) => {
    const pId = +req.body.id;
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: pId
                }
            })
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0]
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product
            } else {
                return Product.findByPk(pId)
            }
        })
        .then(product => fetchedCart.addProduct(product, {
            through: {
                quantity: newQuantity
            }
        }))
        .then(() => res.redirect('/cart'))
        .catch(error => console.log(error))
    // Product.findProductById(productId, (item) => {
    //     Cart.addProduct(productId, item.price)
    //     res.redirect('/cart')
    // })
}

exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    req.user.getCart()
        .then(cart => cart.getProducts({
            where: {
                id: productId
            }
        }))
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy()
        })
        .then(result => res.redirect('/cart'))
        .catch(error => console.log(error))
    // Product.findProductById(productId, product => {
    //     Cart.deleteProduct(productId, product.price)
    //     res.redirect('/cart')
    // })
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', { // render page - ejs/pug etc
                pageTitle: 'Your Orders',
                path: '/orders', //route that will handle it,
                orders
            })
        })
        .catch(error => console.log(error))
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts()
        })
        .then(products => req.user.createOrder()
            .then(order => order.addProduct(products.map(product => {
                product.orderItem = {
                    quantity: product.cartItem.quantity
                }
                return product;
            })))
        )
        .then(result => fetchedCart.setProducts(null))
        .then(result => res.redirect('/orders'))

        //import products to order)
        .catch(error => console.log(error))
}

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', { // render page - ejs/pug etc
//         pageTitle: 'Checkout your order',
//         path: '/checkout' //route that will handle it
//     })
// }