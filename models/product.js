const fs = require('fs');
const path = require('path');
const rootDir = require("../helpers/path");

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

    }

    save() {
        this.id = (Math.random()*1000).toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('error occured', err)
            })
        });
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