const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // author: DataTypes.STRING,
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    yearWritten: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1991,
            max: new Date().getFullYear()
        },
        defaultValue: new Date().getFullYear()
    }
}, { 
    sequelize,
    underscored: true, 
    timestamps: false,
    modelName: 'blogs'
})

module.exports = Blog