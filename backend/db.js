const mongoose = require('mongoose')
const uri = "mongodb://localhost:27017/kanban"

const connect = async () => {
    await mongoose.connect(uri)
    console.log("db connected");
}

module.exports = connect