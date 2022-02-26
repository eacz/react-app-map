import { FC, useCallback, useContext, useEffect, useReducer } from 'react'
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl'
import { MapContext, PlacesContext, ThemeContext } from '../'
import MapReducer from './MapReducer'
import { directionsApi } from '../../apis'
import { DirectionsResponse } from '../../interfaces/directions'
export interface MapState {
  isMapReady: boolean
  map?: Map
  markers: Marker[]
  currentZoom: number | null
  currentLocation: [number, number] | null
}

const initialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  currentZoom: null,
  currentLocation: null,
}

const sourceAndPolyLineId = 'routePolyLine'

const MapProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, initialState)
  const { places, userLocation } = useContext(PlacesContext)
  const { currentTheme } = useContext(ThemeContext)

  const setMap = (map: Map) => {
    const myLocationPopUp = new Popup().setHTML(`<h4>Here I'm </h4>`)

    new Marker({ color: '#001780' }).setLngLat(userLocation).setPopup(myLocationPopUp).addTo(map)

    dispatch({ type: 'setMap', payload: map })

    //TODO: type event
    map.on('zoomend', (e: any) => {
      setZoom(e.target.transform._zoom)
    })

    //TODO: type event
    map.on('moveend', (e: any) => {
      setCurrentLocation(e.target.transform._center)
    })
  }

  const setZoom = (zoom: number) => {
    dispatch({ type: 'setZoom', payload: zoom })
  }

  const setCurrentLocation = ({ lat, lng }: { lng: number; lat: number }) => {
    dispatch({type: 'setCurrentLocation', payload: [lng, lat]})
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
    if (state.map?.getLayer(sourceAndPolyLineId)) {
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

  const setMarkers = useCallback(() => {
    state.markers.forEach((marker) => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup().setHTML(`<h6>${place.text_en}</h6> <p>${place.place_name_en}</p>`)
      const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!)
      newMarkers.push(newMarker)
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })
  }, [places, currentTheme, state.map])

  useEffect(() => {
    setMarkers()
  }, [places, setMarkers])

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
        setMarkers,
        setZoom,
        setCurrentLocation,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapProvider
