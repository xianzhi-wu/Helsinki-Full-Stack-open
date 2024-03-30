const router = require('express').Router()
require('express-async-errors')

const { Blog } = require('../models') 

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll()
        res.json(blogs)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/:id', blogFinder, async (req, res, next) => {
    try {
        if (req.blog) {
            res.json(req.blog)
        } else {
            res.status(404).end()
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
    try {
        if (req.blog) {
            await req.blog.destroy()
            res.status(204).end()
            // console.log(`Blog entry with ID ${req.blog.id} has been deleted successfully.`)
        } else {
            res.status(404).end()
            // console.log(`No blog entry found with ID ${req.blog.id}.`)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.put('/like/:id', blogFinder, async (req, res, next) => {
    try {
        if (req.blog) {
            req.blog.likes += 1
            await req.blog.save()
            res.json({likes: req.blog.likes})
        } else {
            res.status(404).end()
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router