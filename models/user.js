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
            newQTY = updatedCartItems[cartProductIndex].quantity + 1;
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
        const db = getDb();
        const productIds = this.cart.items.map(item => item.productId);
        return db.collection('products')
        .find({_id : {
            //return all alements - which ids - is equal to productId
            $in: productIds
        }}).toArray()
        .then(products => {
            return products.map(prod => {
                const { quantity } = this.cart.items.find(item => item.productId.toString() === prod._id.toString())
                return {
                    ...prod,
                    quantity
                }
            })
        })
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users')
        // .find({_id: new mongodb.ObjectId(id)}).next() // the same way
        .findOne({_id: new mongodb.ObjectId(id)}) 
        .then(data => data)
        .catch(error => console.log(error))

    }

    deleteItemFromCart(productId) {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        return db.collection('users').updateOne(
            { _id: new mongodb.ObjectId(this._id) }, 
            {$set: {cart: {
                items: updatedCartItems
            }}})
            .then(data => data)
            .catch(error => console.log(error))
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
            return {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name,
                }
            }
        })
        .then(data => {
            return db.collection('orders')
            .insertOne(data)
        })
        .then(result => { 
            this.cart = {items: []}
            return db.collection('users').updateOne(
                { _id: new mongodb.ObjectId(this._id) }, 
                {$set: {cart: {items: []}}})                  
        })
        .then(data => data)
        .catch(error => console.log(error))    
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders')
        .find({'user._id' : new mongodb.ObjectId(this._id)})
        .toArray()
        .then(data => data)
        .catch(error => console.log(error))
    }
}

module.exports = User