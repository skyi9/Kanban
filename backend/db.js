const mongoose = require('mongoose')
const uri = "mongodb+srv://ishandevenda1:mybackend@ishan-backend.1hyxtao.mongodb.net/?retryWrites=true&w=majority"

const connect = async () => {
    await mongoose.connect(uri)
    console.log("db connected");
}

module.exports = connect