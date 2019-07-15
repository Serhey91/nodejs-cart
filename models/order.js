//FROM SEQUELIZE

const Sequelize = require('sequelize');
const sequelize = require("../helpers/database"); //database what is connected

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    price: Sequelize.DOUBLE
})

module.exports = Order;
