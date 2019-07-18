const { getDb } = require('../helpers/database')
const mongodb = require('mongodb')

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl
    }
    save() {
        const db = getDb();
        //whitch collection to connect
        return db.collection('products')
        .insertOne(this)
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

    static fetchAll() {
        const db = getDb();
        //find return CURSOR
        return db.collection('products')
        .find()
        .toArray()
        .then(products => products)
        .catch(error => console.log(error))
    }
    static fetchOne(id) {
        const db = getDb();
        return db.collection('products')
        .find({_id: new mongodb.ObjectId(id)}) //will give a cursor
        .next()
        .then(data => {console.log(data); return data})
        .catch(error => console.log(error))
    }
}

module.exports = Product