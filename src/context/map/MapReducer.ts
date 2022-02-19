import { Map, Marker } from 'mapbox-gl'
import { MapState } from './MapProvider'

type MapActions = 
| { type: 'setMap'; payload: Map } 
| { type: 'setMarkers'; payload: Marker[] }

const MapReducer = (state: MapState, action: MapActions): MapState => {
  switch (action.type) {
    case 'setMap':
      return { ...state, map: action.payload, isMapReady: true }
    case 'setMarkers':
      return { ...state, markers: action.payload }
    default:
      return state
  }
}

export default MapReducer
