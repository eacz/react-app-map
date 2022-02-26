//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl'
import { MapState } from './MapProvider'

type MapActions = 
| { type: 'setMap'; payload: Map } 
| { type: 'setMarkers'; payload: Marker[] }
| { type: 'setZoom'; payload: number }
| { type: 'setCurrentLocation'; payload: [number, number] }

const MapReducer = (state: MapState, action: MapActions): MapState => {
  switch (action.type) {
    case 'setMap':
      return { ...state, map: action.payload, isMapReady: true }
    case 'setMarkers':
      return { ...state, markers: action.payload }
    case 'setZoom': 
      return {...state, currentZoom: action.payload}
    case 'setCurrentLocation': 
      return {...state, currentLocation: action.payload}
    default:
      return state
  }
}

export default MapReducer
