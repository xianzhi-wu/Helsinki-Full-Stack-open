const Blog = require('./blog')
const User = require('./user')

// Avoid auto-generated key 'userId'
User.hasMany(Blog, { 
    foreignKey: 'user_id', 
    sourceKey: 'id' 
})
  
Blog.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'author', 
    targetKey: 'id' 
})

module.exports = {
    Blog,
    User
}