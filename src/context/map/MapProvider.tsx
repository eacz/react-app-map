import { FC, useReducer } from 'react'
import { Map, Marker, Popup } from 'mapbox-gl'
import MapContext from './MapContext'
import MapReducer from './MapReducer'

export interface MapState {
  isMapReady: boolean
  map?: Map,
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
}

const MapProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)

  const setMap = (map: Map) => {
    
    const myLocationPopUp = new Popup()
      .setHTML(`<h4>Here I'm </h4> <p>Resis City</p>`)


    new Marker({color: '#61DAFB'})
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopUp)
      .addTo(map)

    dispatch({type: 'setMap', payload: map})
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
