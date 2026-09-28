require('dotenv').config()
const express = require('express')
const connectionDB = require('./src/config/connectDB.js')
const routes = require('./src/routes/userRoutes.js')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./src/middleware/errorHanddling.js')

const app = express()
//securety
app.use(cors())
app.use(helmet())

connectionDB()
PORT = process.env.PORT

app.use(express.json())
app.use('/api/user', routes)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`lsiten in PORT: ${PORT}`);
})
