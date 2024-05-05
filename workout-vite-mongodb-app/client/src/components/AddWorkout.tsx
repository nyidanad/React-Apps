import { FormEvent, useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

function AddWorkout() {
  const { dispatch } = useWorkoutContext()
  const [title, setTitle] = useState('')
  const [reps, setReps] = useState('')
  const [load, setLoad] = useState('')
  const [error, setError] = useState('')
  const [empties, setEmpties] = useState<string[]>([])
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const workout = { title, load, reps }
    const res = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await res.json()

    if (!res.ok) {
      setError(json.error)
      setEmpties(json.empties)
    }
    if (res.ok) {
      setTitle('')
      setReps('')
      setLoad('')
      setError('')
      setEmpties([''])
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add Workout</h3>
      <label>
        Exercise Title
        {empties.includes('title') && <span style={{ color: "#e7195a" }}> *</span>}
      </label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className={empties.includes('title') ? 'error' : ''} />

      <label>
        Reps
        {empties.includes('reps') && <span style={{ color: "#e7195a" }}> *</span>}
      </label>
      <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} className={empties.includes('reps') ? 'error' : ''} />

      <label>
        Load (kg)
        {empties.includes('load') && <span style={{ color: "#e7195a" }}> *</span>}
      </label>
      <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} className={empties.includes('load') ? 'error' : ''} />

      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddWorkout