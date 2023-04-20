const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    boardTitle: {
        type: String,
        require: true
    }
})

const board = mongoose.model("boardSchema", boardSchema)
module.exports = board