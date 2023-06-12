const Task = require("../models/Task");

const taskService = {}

taskService.getTasksbyUser = async(user_id) => {
    const userId = user_id;

    const tasksByUser = await Task.find({
        user_id: userId
    })
    .populate('user_id')

    return tasksByUser;
}

module.exports = taskService;