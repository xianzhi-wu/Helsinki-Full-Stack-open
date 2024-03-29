const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
    } catch (err) {
        console.log('Connecting to database failed: ', err)
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }