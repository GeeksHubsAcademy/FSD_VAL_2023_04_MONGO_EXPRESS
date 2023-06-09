const express = require('express');
require('dotenv').config();
const db = require('./db');
const User = require('./models/User');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/users', async (req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // const { name, email, password } =  req.body;

        const user = await User.create(
            {
                name,
                email: email,
                password: password,
                role: "user"
            }
        )

        return res.json({
            success: true,
            message: "User registered",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cant be registered",
            error: error.message
        })
    }
})

db();

app.listen(PORT, () => {
    console.log("Server runinng on port: " + PORT);
})