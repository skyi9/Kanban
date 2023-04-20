const connectToDb = require('./db')
const express = require('express')
const cors = require('cors')

const baordRoutes = require('./routes/boardRoute')
const taskRoutes = require('./routes/taskRoute')
const app = express()
const port = 5000
app.use(cors());

connectToDb()

app.use(express.json());

app.use('/api', baordRoutes);
app.use('/api', taskRoutes)

app.listen(port, () => {
    console.log(`app listening at port: ${port}`)
})
