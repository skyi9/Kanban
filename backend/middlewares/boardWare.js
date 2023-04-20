const Boards = require('../models/BoardSchema')

async function Boardware(req, res, next) {
    try {
        const board = await Boards.findById(req.params.id);
        if (!board) {
            return res.status(404).json({ message: 'board not found' });
        }
        res.board = board;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = Boardware