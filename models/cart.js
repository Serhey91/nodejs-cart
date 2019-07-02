const fs = require('fs');
const path = require('path');
const rootDir = require("../helpers/path");

const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {
    static addProduct(id, productPrice) {
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

    static deleteProduct(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if(err) return
            let cart = JSON.parse(fileContent)
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(p => p.id === id);
            if (!product) {
                return;
            }
            updatedCart.products = updatedCart.products.filter(p => p.id !== id)            
            if(updatedCart.length === 0) updatedCart.totalPrice = 0;
            else updatedCart.totalPrice = cart.totalPrice - product.count * price;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(err) cb(null)
            else {
                const cart = JSON.parse(fileContent);
                cb(cart)
            }
        })
    }
}