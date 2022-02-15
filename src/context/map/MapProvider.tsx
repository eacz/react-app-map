import { FC, useReducer } from 'react'
import { Map } from 'mapbox-gl'
import MapContext from './MapContext'
import MapReducer from './MapReducer'

export interface MapState {
  isMapReady: boolean
  map?: Map
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
}

const MapProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)
  return (
    <MapContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
