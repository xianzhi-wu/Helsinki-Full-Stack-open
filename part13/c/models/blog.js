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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        // Disable the automatic generation of camelCase version fields 'userId'
        // Specify the field name explicitly
        field: 'user_id'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { 
    sequelize,
    underscored: true, 
    timestamps: false,
    modelName: 'blogs'
})

module.exports = Blog