const logger = require('./logger')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('-----')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unkonwn endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.msg)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }

    next(error)
}

// should catch error
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

// should catch error
const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (decodedToken && decodedToken.id) {
            const user = await User.findById(decodedToken.id)
            if (user) {
                request.user = user
            }
        }
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}