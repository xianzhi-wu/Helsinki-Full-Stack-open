const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: DataTypes.STRING,
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
}, { 
    sequelize, 
    timestamps: false,
    modelName: 'blogs'
})

module.exports = Blog