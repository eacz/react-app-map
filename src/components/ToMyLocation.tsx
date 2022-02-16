import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

const ToMyLocation = () => {
  const { map } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const onClick = () => {
    if(!map) throw new Error("The map isn't ready yet!")
    if(!userLocation) throw new Error("There is no an user location!")

    map.flyTo({zoom: 14, center: userLocation })
  }

  if(!map){
    return (
      <></>
    )
  }

  return (
    <button className="btn btn-primary" onClick={onClick} style={{position: 'fixed', top: 20, right: 20, zIndex: 999}} >
      My ubication
    </button>
  )
}

export default ToMyLocation
