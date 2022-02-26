import { createContext } from 'react'
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl'

interface MapContextProps {
  isMapReady: boolean
  map?: Map,
  markers: Marker[],
  currentZoom: number | null,
  currentLocation: [number, number] | null,
  setMap: (map:Map) => void,
  getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>,
  setMarkers: () => void,
  setZoom: (zoom: number) => void,
  setCurrentLocation: (lngLat: { lng: number, lat: number}) => void,
}

const MapContext = createContext({} as MapContextProps)

export default MapContext
