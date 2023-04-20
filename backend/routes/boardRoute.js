const express = require('express')
const router = express.Router()
const Boards = require('../models/BoardSchema')
const Boardware = require('../middlewares/boardWare')
const Tasks = require('../models/TaskSchema')

router.get("/boards", async (req, res) => {
    try {
        const boards = await Boards.find()
        if (!boards) {
            res.status(400).json({ message: "boards not found" })
        }
        res.status(200).json(boards)
    } catch (error) {
        res.status(404).send((error) => { console.log("error: ", error); })
    }
})

router.post("/newboard", async (req, res) => {
    try {
        const board = new Boards({
            boardTitle: req.body.boardTitle
        })
        const newBoard = await board.save()
        res.status(200).json(newBoard)
    } catch (error) {
        res.status(404).send((error) => { console.log("error: ", error); })
    }
})

router.delete('/deleteboard/:id', Boardware, async (req, res) => {
    try {
        const tasks = await Tasks.find({ boardId: req.params.id })
        for (let i = 0; i < tasks.length; i++) {
            await tasks[i].deleteOne()
        }
        const board = await Boards.findByIdAndDelete(req.params.id)
        if (!tasks) {
            throw new Error('tasks not found')
        }
        if (!board) {
            return res.status(404).json({ message: "board not found" })
        }
        res.status(200).json(board)
    } catch (error) {
        console.log("error: ", error)
        res.status(404).send(error)
    }
})



module.exports = router