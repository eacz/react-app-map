import { FC, useContext, useEffect, useReducer } from 'react'
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl'
import { MapContext, PlacesContext } from '../'
import MapReducer from './MapReducer'
import { directionsApi } from '../../apis'
import { DirectionsResponse } from '../../interfaces/directions'
export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

const sourceAndPolyLineId = 'routePolyLine'

const MapProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup().setHTML(`<h6>${place.text_en}</h6> <p>${place.place_name_en}</p>`)
      const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!)
      newMarkers.push(newMarker)
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })
  }, [places])

  const setMap = (map: Map) => {
    const myLocationPopUp = new Popup().setHTML(`<h4>Here I'm </h4> <p>Resis City</p>`)

    new Marker({ color: '#001780' }).setLngLat(map.getCenter()).setPopup(myLocationPopUp).addTo(map)

    dispatch({ type: 'setMap', payload: map })
  }

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const res = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
    const { distance, duration, geometry } = res.data.routes[0]
    const { coordinates: coords } = geometry

    let kms = distance / 1000
    kms = Math.round(kms * 100)
    kms /= 100

    const minutes = Math.floor(duration / 60)
    console.log({ kms, minutes })

    const bounds = new LngLatBounds(start, start)
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, { padding: 100 })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    }
    if(state.map?.getLayer(sourceAndPolyLineId)) {
      state.map.removeLayer(sourceAndPolyLineId)
      state.map.removeSource(sourceAndPolyLineId)
    }

    state.map?.addSource(sourceAndPolyLineId, sourceData)
    state.map?.addLayer({
      id: sourceAndPolyLineId,
      type: 'line',
      source: sourceAndPolyLineId,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#000000',
        'line-width': 3,
      },
    })

  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
