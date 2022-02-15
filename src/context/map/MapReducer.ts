import { Map } from 'mapbox-gl'
import { MapState } from './MapProvider'

type MapActions = { type: 'setMap'; payload: Map }

const MapReducer = (state: MapState, action: MapActions): MapState => {
  switch (action.type) {
    case 'setMap':
      return { ...state, map: action.payload, isMapReady: true }
    default:
      return state
  }
}

export default MapReducer
