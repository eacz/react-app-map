import { FC, useContext, useEffect, useReducer } from 'react'
import { Map, Marker, Popup } from 'mapbox-gl'
import {MapContext, PlacesContext} from '../'
import MapReducer from './MapReducer'
export interface MapState {
  isMapReady: boolean
  map?: Map,
  markers: Marker[]
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}

const MapProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach(marker => marker.remove())
    const newMarkers: Marker[] = []

    for (const place  of places) {
      const [lng, lat] = place.center
      const popup = new Popup()
        .setHTML(`<h6>${place.text_en}</h6> <p>${place.place_name_en}</p>`)
      const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!)
      newMarkers.push(newMarker)
    }

    dispatch({type: 'setMarkers', payload: newMarkers})

  }, [places])

  const setMap = (map: Map) => {
    
    const myLocationPopUp = new Popup()
      .setHTML(`<h4>Here I'm </h4> <p>Resis City</p>`)


    new Marker({color: '#001780'})
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
