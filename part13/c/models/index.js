const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User, { foreignKey: 'user_id', as: 'author' })

/*
Blog.sync({ alter: true })
User.sync({ alter: true })
*/

module.exports = {
    Blog,
    User
}