import { useContext, useLayoutEffect, useRef } from 'react'
import { Map } from 'mapbox-gl'

import PlacesContext from '../context/places/PlacesContext'
import { Loading } from './'

const MapView = () => {
  const { userLocation, isLoading } = useContext(PlacesContext)
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 15,
      })
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div
      ref={mapDiv}
      style={{ backgroundColor: 'red', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}
    ></div>
  )
}

export default MapView
