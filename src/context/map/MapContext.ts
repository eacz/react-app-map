import { createContext } from 'react'
import { Map } from 'mapbox-gl'

interface MapContextProps {
  isMapReady: boolean
  map?: Map,
  setMap: (map:Map) => void
}

const MapContext = createContext({} as MapContextProps)

export default MapContext