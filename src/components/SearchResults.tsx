import { useContext, useState } from 'react'
import { LoadingPlaces } from '.'
import { MapContext, PlacesContext } from '../context'
import { Feature } from '../interfaces/places'

const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const { map } = useContext(MapContext)
  const [activePlace, setActivePlace] = useState('')

  const onPlaceClick = (place: Feature) => {
    setActivePlace(place.id)
    const [lng, lat] = place.center
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    })
  }

  if (isLoadingPlaces) {
    return <LoadingPlaces />
  }

  if(places.length === 0) return <></>

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <li 
          onClick={() => onPlaceClick(place)} key={place.id} 
          className={`list-group-item list-group-item-action pointer ${place.id === activePlace ? 'active' : ''}`}
        >
          <h6>{place.text_en}</h6>
          <p style={{ fontSize: 12 }}>
            {place.place_name}
          </p>
          <button className={`btn btn-sm ${place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'}`} >Directions</button>
        </li>
      ))}
    </ul>
  )
}

export default SearchResults
