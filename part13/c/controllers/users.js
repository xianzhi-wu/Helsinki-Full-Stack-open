const router = require('express').Router()
require('express-async-errors')

const { User } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        if (users) {
            res.json(users)
        } else {
            res.status(404).json({ message: 'Users not found' })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        if (newUser) {
            res.json({ message: 'User added' })
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await User.findOne({ where: { username } })
        if (user) {
            user.username = req.body.username
            user.save()
            // HTTP status code 204 stands for "No Content". It indicates that the server has successfully processed the request, 
            // but there is no content to return in the response payload.
            // res.status(204).end()
            res.json({ message: 'Username updated' })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router