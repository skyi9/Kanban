const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boardSchema',
        required: true
    },
    taskTitle: {
        type: String,
        required: true,
    },
    taskDesc: {
        type: String,
        required: false
    },
    taskStatus: {
        type: String,
        required: false
    }
})

const tasks = mongoose.model('tasks', taskSchema)
module.exports = tasks