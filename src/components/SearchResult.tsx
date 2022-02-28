import { useContext } from 'react'
import styled from 'styled-components'
import { Feature } from '../interfaces/places'
import { MapContext, PlacesContext } from '../context'
import { useTranslation } from 'react-i18next';

const Wrapper = styled.li`
  .list-group-item {
  }
  background-color: ${p => p.theme.backgroundColor} !important;
  color: ${p => p.theme.fontColor} !important;
  p {
    font-size: 12px;
  }
  button {
    color: ${p => p.theme.fontColor} !important;
  }
  
`

interface Props {
  place: Feature
  activePlace: string
  setActivePlace: (place: string) => void
}
const SearchResult = ({ place, activePlace, setActivePlace }: Props) => {
  const { userLocation } = useContext(PlacesContext)
  const { map, getRouteBetweenPoints } = useContext(MapContext)
  const { t } = useTranslation()

  const onPlaceClick = (place: Feature) => {
    setActivePlace(place.id)
    const [lng, lat] = place.center
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    })
  }

  const getRoute = (place: Feature) => {
    if (!userLocation) return

    const [lng, lat] = place.center
    getRouteBetweenPoints({start: userLocation, end: [lng, lat]})
  }

  return (
    <Wrapper
      onClick={() => onPlaceClick(place)}
      key={place.id}
      className={`list-group-item list-group-item-action pointer ${place.id === activePlace ? 'active' : ''}`}
    >
      {/* TODO: handle this reading properties through i18n */}
      <h6>{place.text_en || place.text_es}</h6>
      <p>{place.place_name}</p>
      <button
        onClick={() => getRoute(place)}
        className={`btn btn-sm ${place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'}`}
      >
        {t('direction')}
      </button>
    </Wrapper>
  )
}

export default SearchResult
