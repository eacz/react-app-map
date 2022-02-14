import { PlacesState } from "./PlacesProvider"

type placesActions =
| { type: 'setUserLocation', payload: [ number, number ] }
| { type: 'setIsLoading', payload: boolean }

const placesReducer = (state: PlacesState, action: placesActions) : PlacesState => {
  switch(action.type){
    case 'setUserLocation':
      return { ...state, isLoading: false, userLocation: action.payload }
    case 'setIsLoading': 
      return { ...state, isLoading: action.payload }
    default:
      return state;
  }
}

export default placesReducer