const fs = require('fs');
const path = require('path');
const rootDir = require("../helpers/path");

const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch cart
        //analize
        //
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatingProduct;
            if (existingProduct) {
                updatingProduct = {...existingProduct};
                updatingProduct.count += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatingProduct;
            } else {
                updatingProduct = { id, count: 1 }
                cart.products = [...cart.products, updatingProduct]
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }
}