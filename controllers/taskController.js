const Task = require("../models/Task");
const User = require("../models/User");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { title, description, user_id } = req.body;

        const newTask = await Task.create(
            {
                title: title,
                description: description,
                user_id: user_id
            }
        )

        const user = await User.findById(user_id)

        return res.status(201).json(
            {
                success: true,
                message: "Task created",
                data: newTask,
                // user: user,
                // data: {
                //     title: newTask.title,
                //     description: newTask.description,
                //     status: newTask.status
                // }
            }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Task created",
            error: error.message
        })
    } finally {
        console.log('Soy un finally ejemplo');
    }
}

taskController.getTasksByUser = async(req, res) => {
    try {
        const userId = req.body.user_id;

        const tasksByUser = await Task.find({
            user_id: userId
        })
        .populate('user_id')
        //.populate('service_id')

        return res.status(200).json({
            succcess: true,
            message: "Tasks by user retrieved",
            data: tasksByUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Tasks by user cant be retrieved",
            error: error.message
        })
    }
}




module.exports = taskController;