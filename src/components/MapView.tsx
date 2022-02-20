import { useContext, useLayoutEffect, useRef } from 'react'
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from '!mapbox-gl'

import { PlacesContext, MapContext } from '../context'
import { Loading } from './'

const MapView = () => {
  const { userLocation, isLoading } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)
  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: userLocation,
        zoom: 15,
      })
      setMap(map)
    }
  }, [isLoading])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div
      ref={mapDiv}
      style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}
    ></div>
  )
}

export default MapView
