const express = require('express');
require('dotenv').config();
const db = require('./db');

const app = express();

const PORT = process.env.PORT || 3001;

app.post('/users', (req, res) => {
    return res.json({
        success: true,
        message: "User registered"
    })
})

db();

app.listen (PORT, () => {
    console.log("Server runinng on port: " + PORT);
})