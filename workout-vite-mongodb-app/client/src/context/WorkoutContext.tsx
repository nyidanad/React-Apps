import { Dispatch, ReactNode, createContext, useReducer } from 'react'
import { Workout } from '../pages/Home'

enum ActionType {
  SET = 'SET_WORKOUTS',
  CREATE = 'CREATE_WORKOUT',
  DELETE = 'DELETE_WORKOUT'
}

export type Action = {
  type: string,
  payload: Workout
}

type State = {
  workouts: Workout[];
};

export const WorkoutContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({ state: { workouts: [] }, dispatch: () => {} });
export const workoutsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET:
      return { workouts: action.payload }
    case ActionType.CREATE:
      return { workouts: [action.payload, ...state.workouts] }
    case ActionType.DELETE:
      return { workouts: state.workouts.filter(workout => workout._id !== action.payload._id) }
    default:
      return state
  }
}


export const WorkoutContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] })

  return(
    <WorkoutContext.Provider value={{ state, dispatch }}>
      { children }
    </WorkoutContext.Provider>
  )
}