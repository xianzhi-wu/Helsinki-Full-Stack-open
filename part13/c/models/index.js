const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User, { 
    foreignKey: 'userId', 
    as: 'author'
})

module.exports = {
    Blog,
    User
}