const express = require('express');
require('dotenv').config();
const db = require('./db');

const app = express();

const PORT = process.env.PORT || 3001;

db();

app.listen (PORT, () => {
    console.log("Server runinng on port: " + PORT);
})