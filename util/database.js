const Sequelize = require('sequelize');

const sequelize= new Sequelize('node-complete', 'root', 'pk339900', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;