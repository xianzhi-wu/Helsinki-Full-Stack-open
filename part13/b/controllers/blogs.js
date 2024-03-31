const router = require('express').Router()
require('express-async-errors')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const { Blog, User } = require('../models') 
const { SECRET } = require('../util/config')
const { sequelize } = require('../util/db')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
            console.log(req.decodedToken)
      } catch{
            return res.status(401).json({ error: 'token invalid' })
      }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

router.post('/', tokenExtractor, async (req, res) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      // const blog = await Blog.create({...req.body, userId: user.id, author: user.name})
      const blog = await Blog.create({...req.body, userId: user.id})
      res.json(blog)
    } catch(error) {
      return res.status(400).json({ error })
    }
})

const blogFinder = async (req, res, next) => {
    if (req.params.id) {
        req.blog = await Blog.findByPk(req.params.id)
    }
    next()
}

router.get('/', async (req, res, next) => {
    try {
        const where = {}

        if (req.query.search) {
            where[Op.or] = [
                {
                    title: {
                        [Op.substring]: req.query.search
                    }
                },
                {
                    '$author.name$': {
                        [Op.substring]: req.query.search
                    }
                }
            ]
        }

        const blogs = await Blog.findAll({
            attributes: { exclude: ['userId'] },
            include: {
                model: User,
                attributes: ['name'],
                as: 'author'
            },
            where,
            order: [['likes', 'DESC']]
        })
        res.json(blogs)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

/*
router.get('/authors', async (req, res, next) => {
    try {
        const authors = await Blog.findAll({
            attributes: [
                //[sequelize.literal('author.name'), 'author'],
                [sequelize.fn('COUNT', sequelize.col('blogs.id')), 'articles'],
                [sequelize.fn('SUM', sequelize.col('blogs.likes')), 'likes']
            ],
            include: [{
                model: User,
                attributes: ['name'],
                as: 'author'
            }],
            group: 'author.id'
        })

        res.json(authors);
    } catch (error) {
        console.error(error);
        next(error);
    }
})*/

router.get('/authors', async (req, res, next) => {
    try {
        const authors = await sequelize.query(
            `SELECT COUNT("blogs"."id") as articles, SUM("blogs"."likes") as likes, "users"."name" as author ` +
            `FROM "blogs" ` +
            `INNER JOIN "users" ON "blogs"."userId" = "users"."id" ` +
            `GROUP BY "users"."id"`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )        

        res.json(authors);
    } catch (error) {
        console.error(error);
        next(error);
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