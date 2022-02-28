import { useContext, useState } from 'react'
import { LoadingPlaces } from '.'
import { PlacesContext } from '../context'
import { SearchResult } from './'

const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const [activePlace, setActivePlace] = useState('')

  if (isLoadingPlaces) {
    return <LoadingPlaces />
  }

  if (places.length === 0) return <></>

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <SearchResult
          key={place.id}
          activePlace={activePlace}
          setActivePlace={setActivePlace}
          place={place}
        />
      ))}
    </ul>
  )
}

export default SearchResults
