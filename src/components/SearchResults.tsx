import { useContext, useState } from 'react'
import { LoadingPlaces } from '.'
import { PlacesContext } from '../context'
import { SearchResult } from './'
import styled from 'styled-components'

const Wrapper = styled.ul`
  overflow-y: scroll;
  height: 500px;
`

const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const [activePlace, setActivePlace] = useState('')
  if (isLoadingPlaces) {
    return <LoadingPlaces />
  }

  if (places.length === 0) return <></>

  return (
    <Wrapper className='list-group mt-3 test'>
      {places.map((place) => (
        <SearchResult
          key={place.id}
          activePlace={activePlace}
          setActivePlace={setActivePlace}
          place={place}
        />
      ))}
    </Wrapper>
  )
}

export default SearchResults
