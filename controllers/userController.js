const User = require("../models/User");
const bcrypt = require('bcrypt');
const userService = require("../services/userService");

const userController = {}

userController.createUser = async (req, res) => {

    try {           
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        // const { name, email, password } =  req.body;
        
       const user = await userService.createUser(name, email, password)

        return res.json({
            success: true,
            message: "User registered",
            data: user
        })
    } catch (error) {
        if(error.message === 'not a valid password') {
            return res.status(400).json({
                success: true,
                message: "User cant be registered",
                error: error.message
            })
        }

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