import { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'
import { FabButton } from './'

const ToMyLocation = () => {
  const { map } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const onClick = () => {
    if (!map) throw new Error("The map isn't ready yet!")
    if (!userLocation) throw new Error('There is no an user location!')

    map.flyTo({ zoom: 14, center: userLocation })
  }

  if (!map) {
    return <></>
  }

  return (
    <FabButton top={20} right={20} onClick={onClick}>
      <i className='fas fa-compass'></i>
    </FabButton>
  )
}

export default ToMyLocation
