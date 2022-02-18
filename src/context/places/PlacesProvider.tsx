import { FC, useEffect, useReducer } from "react"
import { PlacesContext } from ".."
import { searchApi } from "../../apis"
import { getUserLocation } from "../../helpers"
import { PlacesResponse, Feature } from '../../interfaces/places';
import placesReducer from "./PlacesReducer"


export interface PlacesState {
  isLoading: boolean,
  userLocation?: [  number, number ],
  isLoadingPlaces: boolean,
  places: Feature[]
}

const initialState: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}


const PlacesProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(placesReducer, initialState)

  const searchPlacesByTerm = async (query:string): Promise<Feature[]> => {
    if(query.length === 0) {
      dispatch({type: 'setPlaces', payload:[] })
      return []
    }  
    if(!state.userLocation)  throw new Error('There is no user location!')

    dispatch({type: 'setIsLoadingPlaces', payload: true})
    const res = await searchApi.get<PlacesResponse>(`${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    })
    dispatch({type: 'setPlaces', payload: res.data.features})
    return res.data.features;
  }

  useEffect(() => {
    getUserLocation().then(coords => {
      dispatch({type: 'setUserLocation', payload: coords})
    })
  }, [])

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}

export default PlacesProvider
