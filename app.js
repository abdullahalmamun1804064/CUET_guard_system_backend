const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('./middlewares/errors')
const cors = require('cors')
// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'config/config.env' })


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());
app.use('*', cors({
    origin: true,
    credentials: true
}))

// Import all routes

const auth = require('./routes/auth');
const event = require('./routes/event');



app.use('/api/v1', auth)
app.use('/api/v1/events', event);



// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app