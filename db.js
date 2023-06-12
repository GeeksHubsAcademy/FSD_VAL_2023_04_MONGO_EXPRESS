const mongoose = require('mongoose');

//connection to mongodb
const db = () => mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connection stablished');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });

module.exports = db;