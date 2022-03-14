const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Contact extends Model { }

Contact.init({
    name: DataTypes.STRING(70),
    email: DataTypes.STRING(70),
    telp: DataTypes.CHAR(15),
}, { sequelize, modelName: 'contact' });


module.exports = Contact
