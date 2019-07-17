const {
    MongoClient
} = require('mongodb');

// const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
            `mongodb+srv://sergii:borozenets1991@cluster0-m4gvn.mongodb.net/test?retryWrites=true&w=majority`
        )
        .then(result => {
            console.log('connected');
            _db = result.db();
            callback()
        })
        .catch(error => {
            throw error
            console.log(error)
        })

}

const getDb =() => {
    if(_db) return _db;
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;