import { Workout } from '../pages/Home'
import DeleteWorkout from './DeleteWorkout'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

type WorkoutCardProps = {
  workout: Workout
}

function WorkoutCard({ workout }: WorkoutCardProps) {
  const { dispatch } = useWorkoutContext()

  const handleClick = async () => {
    const res = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
      method: 'DELETE'
    })

    const json = await res.json()

    if (res.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
      <div className="workout-details">
        <div>
          <h4>{workout.title}</h4>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p><strong>Load: </strong>{workout.load} kg</p>
        </div>
        <DeleteWorkout onClick={handleClick} />
      </div>
  )
}

export default WorkoutCard