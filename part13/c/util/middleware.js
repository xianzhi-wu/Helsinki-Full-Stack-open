const logger = require('./logger')
const jwt = require('jsonwebtoken')

const { User } = require('../models')
const { SECRET } = require('../util/config')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('-----')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unkonwn endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error('Error message:', error.message)
    logger.error('Stack trace:', error.stack)
    logger.error('Error name:', error.name)
    logger.error('Error code (if available):', error.code)

    switch(error.name) {
        case 'CastError':
            return response.status(400).send({ error: 'Malformatted id' })
        case 'JsonWebTokenError':
            return response.status(400).json({ error: 'Token missing or invalid' })
        /*
        case 'SequelizeDatabaseError':
            return response.status(400).json({ error: error.message })
        case 'ValidationError':
            return response.status(400).json({ error: error.message })
        */
        default:
            return response.json({ error: error.message })
    }
}

const userExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const decodedToken = jwt.verify(authorization.substring(7), SECRET)
            const user = await User.findByPk(decodedToken.id)
            if (user) {
                req.user = user
            } else {
                return res.status(404).json({ message: 'User not found' })
            }
            next()
        } catch (err) {
            next(err)
        }
    } else {
        return res.status(401).json({ error: 'Token invalid or missing' })
    }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor
}