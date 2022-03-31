import { FC, useEffect, useReducer } from "react"
import { useTranslation } from "react-i18next";
import { PlacesContext } from ".."
import { searchApi } from "../../apis"
import { getUserLocation } from "../../helpers"
import { PlacesResponse, Feature } from '../../interfaces/places';
import placesReducer from "./PlacesReducer"


export interface PlacesState {
  isLoading: boolean,
  userLocation?: [  number, number ],
  isLoadingPlaces: boolean,
  places: Feature[],
  geoLocationDenied: boolean
}

const initialState: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
  geoLocationDenied: false
}


const PlacesProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(placesReducer, initialState)
  const { i18n, t } = useTranslation()
  
  const searchPlacesByTerm = async (query:string): Promise<Feature[]> => {
    if(query.length === 0) {
      dispatch({type: 'setPlaces', payload:[] })
      return []
    }  
    if(!state.userLocation)  throw new Error('There is no user location!')

    dispatch({type: 'setIsLoadingPlaces', payload: true})
    const res = await searchApi.get<PlacesResponse>(`${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
        language: i18n.language
      }
    })
    dispatch({type: 'setPlaces', payload: res.data.features})
    return res.data.features;
  }

  useEffect(() => {
    getUserLocation().then(coords => {
      dispatch({type: 'setUserLocation', payload: coords})
    })
    .catch(() => {
      dispatch({type: 'setGeoLocationDenied', payload: true})
    })
  }, [t])

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
