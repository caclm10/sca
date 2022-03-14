const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:belajar23@localhost:3307/sca')

module.exports = sequelize