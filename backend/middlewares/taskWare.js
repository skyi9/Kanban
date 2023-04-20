const Tasks = require('../models/TaskSchema')

const taskWare = async (req, res, next) => {
    try {
        const task = await Tasks.findById(req.params.id)
        if (!task) {
            res.status(404).json({ message: 'task not found' })
        }
        res.task = task
        next()
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = taskWare