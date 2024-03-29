require('dotenv').config()

const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL)

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

async function displayBlogs() {
    try {
        const blogs = await Blog.findAll({alias: false})
        blogs.forEach(blog => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
        })
    } catch (error) {
        console.error('Error fetching blogs:', error)
    }
}

displayBlogs()

app.get('/api/blogs', async (req, res) => {
    try {
        const notes = await Blog.findAll()
        res.json(notes)
    } catch (error) {
        console.error('Error deleting blog:', error)
    }
})

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const note = await Blog.findByPk(req.params.id)
        if (note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        console.error('Error deleting blog:', error)
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedBlog = await Blog.destroy({
            where: {
                id: id
            }
        })

        if (deletedBlog > 0) {
            res.status(204).end()
            console.log(`Blog entry with ID ${id} has been deleted successfully.`)
        } else {
            res.status(404).end()
            console.log(`No blog entry found with ID ${id}.`)
        }
    } catch (error) {
        console.error('Error deleting blog:', error)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})