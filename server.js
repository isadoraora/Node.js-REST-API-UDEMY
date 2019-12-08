const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection')

//looks for a file in your project called .env that knows the port available
dotEnv.config();

const app = express();

//db connection
dbConnection();

//cors, so your server does not get an error 
app.use(cors())

//request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/product', require('./routes/produsctRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'))

app.get('/', (res, req, next) => {
    res.setEncoding('Hello from the API Server')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

//error handling middleware
app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    })
})