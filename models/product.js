const { getDb } = require('../helpers/database')
const mongodb = require('mongodb')

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }
    save() {
        const db = getDb();
        let dbOperation;
        if (this._id) {
            //whitch collection to connect
            dbOperation = db.collection('products')
            //setting new value (find id, change to some new object)
            .updateOne({_id: this._id}, {$set: this})
        } else {
            dbOperation = db.collection('products')
            .insertOne(this)
        }
        return dbOperation
        .then(result => result)
        .catch(error => console.log(error))
    }

    static deteleById(id) {
        const db = getDb();
        return db.collection('products')
        .deleteOne({_id: new mongodb.ObjectId(id)})
        .then(data => console.log('Deleted'))
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
        .then(data => data)
        .catch(error => console.log(error))
    }


}

module.exports = Product