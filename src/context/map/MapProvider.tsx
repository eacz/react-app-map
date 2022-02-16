import { FC, useMemo, useReducer } from 'react'
import { Map } from 'mapbox-gl'
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
