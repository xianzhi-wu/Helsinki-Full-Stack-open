const router = require('express').Router()
require('express-async-errors')
const { Op } = require('sequelize')

const { Blog, User } = require('../models') 
const { sequelize } = require('../util/db')

const { userExtractor } = require('../util/middleware')

router.post('/', userExtractor, async (req, res, next) => {
    try {
        const user = req.user
        console.log(user.userId)
        const blog = await Blog.create({...req.body, user_id: user.id})
        res.json({blog: blog})
    } catch(err) {
        next(err)
    }
})

const blogFinder = async (req, res, next) => {
    try {
        if (req.params.id) {
            const blog = await Blog.findByPk(req.params.id)
            if (blog) {
                req.blog = blog
            } else {
                return res.status(404).json({ message: 'Blog not found' })
            }
        }
        next()
    } catch (err) {
        next(err)
    }
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
            attributes: [
                'id',
                'title',
                'url',
                'likes',
                'created_at',
                'updated_at',
                'year_written',
                [sequelize.col('author.name'), 'author']
            ],
            include: {
                model: User,
                attributes: [],
                as: 'author'
            },
            where,
            order: [['likes', 'DESC']],
            raw: true 
        })
        if (blogs) {
            res.json({blogs: blogs})
        } else {
            res.status(404).json({ message: 'Blogs not found' })
        }
    } catch (error) {
        next(error)
    }
})

router.get('/authors', async (req, res, next) => {
    try {
        const authors = await Blog.findAll({
            attributes: [
                [sequelize.col('author.name'), 'author'],
                [sequelize.fn('COUNT', sequelize.col('blogs.id')), 'articles'],
                [sequelize.fn('SUM', sequelize.col('blogs.likes')), 'likes']
            ],
            include: [{
                model: User,
                attributes: [],
                as: 'author'
            }],
            group: 'author.id',
            raw: true // Return raw data instead of Sequelize model instances
        })
        
        if (authors) {
            res.json({authors: authors})
        } else {
            res.status(404).json({ message: 'Authors not found' })
        }
    } catch (err) {
        next(err)
    }
})

/*
router.get('/authors', async (req, res, next) => {
    try {
        const authors = await sequelize.query(
            `SELECT COUNT("blogs"."id") as articles, SUM("blogs"."likes") as likes, "users"."name" as author ` +
            `FROM "blogs" ` +
            `INNER JOIN "users" ON "blogs"."user_id" = "users"."id" ` +
            `GROUP BY "users"."id"`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        )        

        res.json(authors);
    } catch (err) {
        next(err)
    }
})
*/

router.get('/:id', blogFinder, async (req, res, next) => {
    try {
        res.json({blog: req.blog})
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
    try {
        await req.blog.destroy()
        res.json({ message: 'Blog deleted successfully' })
    } catch (err) {
        next(err)
    }
})

router.put('/like/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog.likes += 1
        await req.blog.save()
        res.json({likes: req.blog.likes})
    } catch (err) {
        next(err)
    }
})

module.exports = router