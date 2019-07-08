// //FILE for connecting for MYSQL
// const myqsl = require('mysql2');

// // new connection
// // const connection = myqsl.createConnection()


// // multiple connections simultaniously
// const pool = myqsl.createPool({
//     // object about connection for DB
//     host: 'localhost',
//     user: 'root', // user on PC
//     database: 'node-complete', // name of schema
//     password: 'borozenets1991'
// });

// module.exports = pool.promise(); //using async tasks with promises


//USING SEQUIELIZE
const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'borozenets1991', {
    dialect: 'mysql',
    host: 'localhost'
}) //schema-name + root user + password

module.exports = sequelize;