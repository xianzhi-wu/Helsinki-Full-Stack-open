const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const jwt = require('jsonwebtoken')
const User = require('../models/user')

const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = request.user
    if (!user.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    //const user = await User.findById(decodedToken.id)

    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id
    })

    /*
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201)
    */
    // Start a session
    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const savedBlog = await blog.save({ session })

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save({ session })

        // Commit the transaction
        await session.commitTransaction()
        session.endSession()

        response.status(201).json(savedBlog)
    } catch (error) {
        console.log(error)
        // Rollback
        if (session) {
            await session.abortTransaction()
            session.endSession()
        }
        response.status(500).json({ error: error.message })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    if (!user.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    // Start a session
    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const deletedBlog = await Blog.findByIdAndDelete(request.params.id).session(session)
        if (!deletedBlog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        if (deletedBlog.user.toString() !== user.id) {
            return response.status(401).json({ error: 'invalid token' })
        }

        // const user = await User.findById(deletedBlog.user)
        user.blogs = user.blogs.filter(blogId => blogId !== deletedBlog.id)
        await user.save({ session })

        // Commit the transaction
        await session.commitTransaction()
        session.endSession()

        /* 
        HTTP status code 204 signifies that the server has successfully fulfilled the request 
        and that there is no content to send in the response payload body.
        */ 
        response.status(204).end()
    } catch (error) {
        console.log(error)
        // Rollback
        if (session) {
            await session.abortTransaction()
            session.endSession()
        }
        response.status(500).json({ error: error.message })
    }
})

module.exports = blogsRouter