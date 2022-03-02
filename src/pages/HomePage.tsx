import { MapView, SearchBar, ToMyLocation, ToggleThemeButton, DirectionsInfo } from "../components"
import SearchProvider from "../context/search/SearchProvider"

const HomePage = () => {
  return (
    <div>
      <MapView />
      <ToMyLocation />
      <ToggleThemeButton />
      <DirectionsInfo />
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    </div>
  )
}

export default HomePage
