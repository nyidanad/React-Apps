import { FaTrashCan } from "react-icons/fa6";

type DeleteWorkoutProps = {
  onClick: () => void
}

function DeleteWorkout({ onClick }: DeleteWorkoutProps) {
  return (
    <button className="delete">
        <FaTrashCan onClick={onClick} />
    </button>
  )
}

export default DeleteWorkout