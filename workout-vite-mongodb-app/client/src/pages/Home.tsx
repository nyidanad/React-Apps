import { useEffect } from "react"
import WorkoutCard from '../components/WorkoutCard'
import AddWorkout from "../components/AddWorkout"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

export type Workout = {
  _id: number,
  title: string,
  reps: number,
  load: number
}

const Home = () => {
  const { state: {workouts}, dispatch} = useWorkoutContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch('http://localhost:4000/api/workouts')
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </div>
      <AddWorkout />
      
    </div>
  )
}

export default Home