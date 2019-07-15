const Sequelize = require('sequelize');
const sequelize = require("../helpers/database"); //database what is connected

const OrderItem = sequelize.define('order-item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = OrderItem;