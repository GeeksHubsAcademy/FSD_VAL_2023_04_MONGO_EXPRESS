const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Mongo db connected")
        })
        .catch((error) => {
            console.log(error.message, "Error connecting to db");
        })
}

module.exports = db;
