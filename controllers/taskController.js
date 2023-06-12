const Task = require("../models/Task");

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

        return res.status(201).json(
            {
                success: true,
                message: "Task created",
                data: newTask
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
            message: "Task cant be registered",
            error: error.message
        })
    }
}


module.exports = taskController;