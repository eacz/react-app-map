import { useContext } from 'react'
import PlacesContext from '../context/places/PlacesContext'
import { Loading } from './'

const MapView = () => {
  const { userLocation, isLoading } = useContext(PlacesContext)

  if (isLoading) {
    return <Loading />
  }

  return <div>{userLocation?.join(', ')}</div>
}

export default MapView
