const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (req, res, next) => {
    try {
        const body = req.body
        const user = await User.findOne({ 
            where: { 
                username: body.username
            }
        })
        
        const passwordCorrect = body.password === 'xianzhi'

        if (!(user && passwordCorrect)) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const userForToken = {
            id: user.id,
            username: user.username
        }

        const token = jwt.sign(userForToken, SECRET)

        res.status(200).send({ token })
    } catch (err) {
        next(err)
    }
})

module.exports = router 