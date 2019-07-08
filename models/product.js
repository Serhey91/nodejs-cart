/////////////AFTER SEQUELIZE

const Sequelize = require('sequelize');
const sequelize = require("../helpers/database"); //database what is connected

//Defining model of product
const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product

////////////BEFORE SEQUELIZE
// const db = require('../helpers/database');

// const Cart = require('./cart')

// //BEFORE SQL

// // const fs = require('fs');
// // const path = require('path');
// // const rootDir = require("../helpers/path");

// // const p = path.join(rootDir, 'data', 'products.json')

// // const getProductsFromFile = (cb) => {
// //     fs.readFile(p, (err, fileContent) => {
// //         if (err) {
// //             cb([])
// //         } else {
// //             cb(JSON.parse(fileContent));
// //         }
// //     })
// // }

// module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;

//     }

//     save() {

//         //AFTER SQL
//         return db.execute(`INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)`, [
//            this.title, this.price, this.imageUrl, this.description 
//         ]) 
//         //BEFORE SQL
//         // getProductsFromFile(products => {
//         //     if (this.id) {
//         //         const existingProductIndex = products.findIndex(item => item.id === this.id);
//         //         const updatedProducts = [...products];
//         //         updatedProducts[existingProductIndex] = this;
//         //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//         //             console.log('error occured', err)
//         //         })
//         //     } else {
//         //         this.id = (Math.random() * 1000).toString();
//         //         products.push(this);
//         //         fs.writeFile(p, JSON.stringify(products), err => {
//         //             console.log('error occured', err)
//         //         })
//         //     }
//         // });
//     }

//     static delete(productId) {

//         //AFTER SQL
//         return db.execute('DELETE FROM products WHERE products.id = ?', [productId])

//         //BEFORE SQL
//         // getProductsFromFile(products => {
//         //     const existingProductIndex = products.findIndex(item => item.id === productId);
//         //     const existingProductPrice = products[existingProductIndex]['price'];
//         //     products.splice(existingProductIndex, 1);
//         //     fs.writeFile(p, JSON.stringify(products), err => {
//         //         if(!err) {
//         //             Cart.deleteProduct(productId, existingProductPrice)
//         //         }
//         //     })
//         // })
//     }

//     static findProductById(id) {     

//         //AFTER SQL   
//         return db.execute('SELECT * FROM products WHERE products.id = ?', [id])

//         //BEFORE SQL
//         // getProductsFromFile(products => {
//         //     const prodItem = products.find(item => item.id === id);
//         //     cb(prodItem);
//         // })
//     }

//     //method for using by Class - not by instances
//     static fetchAll() {

//         //AFTER SQL
//         return db.execute('SELECT * FROM products')

//         //BEFORE SQL

//         // getProductsFromFile(cb)
//     }
// }