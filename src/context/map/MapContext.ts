import { createContext } from 'react'
import { Map, Marker } from 'mapbox-gl'

interface MapContextProps {
  isMapReady: boolean
  map?: Map,
  markers: Marker[]
  setMap: (map:Map) => void
}

const MapContext = createContext({} as MapContextProps)

export default MapContext
