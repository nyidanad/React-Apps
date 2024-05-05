const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// <--- GET ALL --->
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 })
  res.status(200).json(workouts)
}

// <--- GET SINGLE --->
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// <--- POST --->
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body
  const empties = []

  if (!title) {
    empties.push('title')
  }
  if (!reps) {
    empties.push('reps')
  }
  if (!load) {
    empties.push('load')
  }
  if (empties.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields!', empties })
  }


  try {
    const workout = await Workout.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// <--- DELETE --->
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// <--- UPDATE --->
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}