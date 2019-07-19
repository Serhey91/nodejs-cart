const { getDb } = require('../helpers/database')
const mongodb = require('mongodb')

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }
    save() {
        const db = getDb();
        return db.collection('users').
        insertOne(this)
        .then(data => data)
        .catch(error => console.log(error))       
    }

    addToCart(product) {
        const db = getDb();
        const cartProductIndex = this.cart.items.findIndex(p => p.productId.toString() === product._id.toString());
        let newQTY = 1;
        const updatedCartItems = [...this.cart.items];
        
        if (cartProductIndex >= 0) {
            newQTY = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQTY;
        } else {
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: 1})
        }
        const updatedCart = {
            items: updatedCartItems
        }
        return db.collection('users').updateOne(
            { _id: new mongodb.ObjectId(this._id) }, 
            {$set: {cart: updatedCart}})
            .then(data => data)
            .catch(error => console.log(error))
    }
    getCart() {
        //STOP HERE!!!
        const db = getDb();
        const productIds = this.cart.items.map(item => item.productId)
        return db.collection('products')
        .find({_id: {
            $in: [productIds]
        }})
        .toArray()
        .then(data => {
            return data.map(p => {return {...p, quantity: this.cart.items.find(i => i.productId.toString() === p._id.toString())}})
        })
        .catch(error => console.log(error))
        // return this.cart;
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users')
        // .find({_id: new mongodb.ObjectId(id)}).next() // the same way
        .findOne({_id: new mongodb.ObjectId(id)}) 
        .then(data => data)
        .catch(error => console.log(error))

    }
}

module.exports = User