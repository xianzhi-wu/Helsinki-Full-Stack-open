const router = require('express').Router()
require('express-async-errors')

const { User } = require('../models')

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch (error) {
        console.error(error)
        next(error)
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
            res.status(204).end()
        } else {
            res.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router