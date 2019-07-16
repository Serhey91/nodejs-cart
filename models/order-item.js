const Sequelize = require('sequelize');
const sequelize = require("../helpers/database"); //database what is connected

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = OrderItem;