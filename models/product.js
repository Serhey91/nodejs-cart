const fs = require('fs');
const path = require('path');
const rootDir = require("../helpers/path");

const Cart = require('./cart')

const p = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(item => item.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log('error occured', err)
                })
            } else {
                this.id = (Math.random() * 1000).toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log('error occured', err)
                })
            }
        });
    }

    static delete(productId) {
        getProductsFromFile(products => {
            const existingProductIndex = products.findIndex(item => item.id === productId);
            const existingProductPrice = products[existingProductIndex]['price'];
            products.splice(existingProductIndex, 1);
            fs.writeFile(p, JSON.stringify(products), err => {
                if(!err) {
                    Cart.deleteProduct(productId, existingProductPrice)
                }
            })
        })
    }

    static findProductById(id, cb) {
        getProductsFromFile(products => {
            const prodItem = products.find(item => item.id === id);
            cb(prodItem);
        })
    }

    //method for using by Class - not by instances
    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}