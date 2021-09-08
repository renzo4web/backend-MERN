const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbConnection } = require('./ database/config');
dotenv.config();

const app = express();

// Database
dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

// AUTH
app.use('/api/auth', require('./routes/auth'));

// EVENTS
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`Server Runiin ${process.env.PORT}`);
});
