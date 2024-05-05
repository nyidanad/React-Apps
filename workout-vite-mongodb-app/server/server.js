require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const workoutRoutes = require('./routes/workouts')

// <--- Middleware --->
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(`${req.method}\t${req.path}`)
  next()
})

// <--- Routes --->
app.use('/api/workouts', workoutRoutes)

// <--- Connect to DB --->
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to database')
      console.log(`Listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
