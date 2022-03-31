import { MapView, SearchBar, ToMyLocation, ToggleThemeButton, DirectionsInfo } from '../components'
import SearchProvider from '../context/search/SearchProvider'
import { useContext } from 'react'
import { PlacesContext } from '../context'
import { ErrorPage } from './'

const HomePage = () => {
  const { geoLocationDenied } = useContext(PlacesContext)

  if (geoLocationDenied) {
    return <ErrorPage />
  }
  return (
    <>
      <MapView />
      <ToMyLocation />
      <ToggleThemeButton />
      <DirectionsInfo />
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    </>
  )
}

export default HomePage
