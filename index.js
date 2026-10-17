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


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        health: 'live'
    });
});

app.use('/api/user', routes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
    try {
        await connectionDB();

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Startup error:', error.message);
        process.exit(1);
    }
}

startServer();
