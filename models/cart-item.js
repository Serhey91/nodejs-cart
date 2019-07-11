const Sequelize = require('sequelize');
const sequelize = require("../helpers/database"); //database what is connected

const CartItem = sequelize.define('cart-item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = CartItem;