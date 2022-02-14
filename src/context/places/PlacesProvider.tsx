import { FC, useReducer } from "react"
import PlacesContext from "./PlacesContext"
import placesReducer from "./PlacesReducer"

export interface PlacesState {
  isLoading: boolean,
  userLocation?: [  number, number ],
}

const initialState: PlacesState = {
  isLoading: true,
  userLocation: undefined
}


const PlacesProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(placesReducer, initialState)
  return (
    <PlacesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}

export default PlacesProvider
