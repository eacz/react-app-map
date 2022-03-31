import { Feature } from "../../interfaces/places"
import { PlacesState } from "./PlacesProvider"

type placesActions =
| { type: 'setUserLocation', payload: [ number, number ] }
| { type: 'setIsLoading', payload: boolean }
| { type: 'setIsLoadingPlaces', payload: boolean }
| { type: 'setPlaces', payload: Feature[] }
| { type: 'setGeoLocationDenied', payload: boolean }

const placesReducer = (state: PlacesState, action: placesActions) : PlacesState => {
  switch(action.type){
    case 'setUserLocation':
      return { ...state, isLoading: false, userLocation: action.payload }
    case 'setIsLoading': 
      return { ...state, isLoading: action.payload }
    case 'setIsLoadingPlaces':
      return {...state, isLoadingPlaces: action.payload, places: []}
    case 'setPlaces':
      return { ...state, isLoadingPlaces: false, places: action.payload }
    case 'setGeoLocationDenied':
      return {...state, geoLocationDenied: action.payload}
    default:
      return state;
  }
}

export default placesReducer