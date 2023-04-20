const express = require('express')
const router = express.Router()
const Tasks = require('../models/TaskSchema')
const taskWare = require('../middlewares/taskWare')

router.get('/alltasks/:id', async (req, res) => {
    try {
        let tasks = await Tasks.find({ boardId: req.params.id })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.post('/addtask', async (req, res) => {
    try {
        const newTask = new Tasks({
            taskTitle: req.body.taskTitle,
            taskDesc: req.body.taskDesc,
            taskStatus: req.body.taskStatus,
            boardId: req.body.boardId
        })
        const addTask = await newTask.save()
        res.status(200).json(addTask)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.patch('/updatetask/:id', taskWare, async (req, res) => {
    try {
        const { taskTitle, taskDesc, taskStatus } = req.body
        const updateTask = {}
        if (taskTitle) {
            updateTask.taskTitle = taskTitle
        }
        if (taskDesc) {
            updateTask.taskDesc = taskDesc
        }
        if (taskStatus) {
            updateTask.taskStatus = taskStatus
        }
        let task = await Tasks.findById(req.params.id)
        if (!updateTask) {
            return res.status(404).json({ message: 'task not found' })
        }
        task = await Tasks.findByIdAndUpdate(req.params.id, { $set: updateTask }, { new: true })
        res.status(200).json(task)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete('/deletetask/:id', taskWare, async (req, res) => {
    try {
        const deleteTask = await Tasks.findByIdAndDelete(req.params.id)
        if (!deleteTask) {
            return res.status(404).json({ message: 'task not found' })
        }
        res.status(200).json(deleteTask)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router