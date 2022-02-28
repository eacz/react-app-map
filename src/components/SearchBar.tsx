import { ChangeEvent, useContext, useRef } from 'react'
import { SearchResults } from '.'
import { MapContext, PlacesContext } from '../context'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: ${p => p.theme.backgroundColor};
  z-index: 999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  width: 250px;
  padding: 5px;
  border-radius: 5px;

  input {
    background-color: ${p => p.theme.backgroundColor} !important;
    color: ${p => p.theme.fontColor} !important;
    border: none ;
  }
`

const SearchBar = () => {
  const debounceRef = useRef<NodeJS.Timeout>()
  const { searchPlacesByTerm,  } = useContext(PlacesContext)
  const { removePolyline } = useContext(MapContext)
  const { t } = useTranslation()

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      if(!e.target.value) {
        removePolyline()
      }
        searchPlacesByTerm(e.target.value)
    }, 350)
  }

  return (
    <Wrapper>
      <input type='text' className='form-control' placeholder={t('search')} onChange={onQueryChange} />
      <SearchResults />
    </Wrapper>
  )
}

export default SearchBar
