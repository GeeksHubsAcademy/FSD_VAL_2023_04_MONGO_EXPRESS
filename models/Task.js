const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
      timestamps: true,
      versionKey: false  
    }
)

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task;
