const Sequelize = require("sequelize");
const db = new Sequelize('products', 'root', null, {
    dialect:'mysql', 
    host: 'localhost'
});

module.exports = db;
