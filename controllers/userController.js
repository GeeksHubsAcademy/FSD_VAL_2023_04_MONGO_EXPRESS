const User = require("../models/User");
const bcrypt = require('bcrypt');

const userController = {}

userController.createUser = async (req, res) => {

    try {           
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        // const { name, email, password } =  req.body;
        
        // todo export to a utils function
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) {
            return res.json({
                success: true,
                message: "Not a valid email",
            })
        }

        // Esta expresión regular garantiza que la contraseña cumpla con los siguientes requisitos:
        // Al menos una letra mayúscula.
        // Al menos una letra minúscula.
        // Al menos un número.
        // Al menos un carácter especial (@, $, !, %, *, ?, &).
        // Longitud entre 8 y 14 caracteres. 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
        const isValidPassword = passwordRegex.test(password)
        if (!isValidPassword) {
            return res.json({
                success: true,
                message: "Not a valid password",
            })
        }

        const newPassword = bcrypt.hashSync(password, 8);

        // todo export to a repository pattern
        const user = await User.create(
            {
                name,
                email: email,
                password: newPassword,
                role: "user",
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
}

userController.getAllUsers = async (req, res) => {

    try {
        const users = await User.find()

        return res.json({
            success: true,
            message: "All users retrieved",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Users cant be retrieved",
            error: error.message
        })
    }
}

userController.destroyUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // const deleteUser = await User.deleteOne({
        //     _id: userId
        // })

        const deleteUser = await User.deleteOne({
            _id: userId
        })

        return res.json({
            success: true,
            message: "User destroyed",
            data: deleteUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Users cant be deleted",
            error: error.message
        })
    }
}

module.exports = userController;