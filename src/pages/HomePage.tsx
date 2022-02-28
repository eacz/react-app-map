import { MapView, SearchBar, ToMyLocation, ToggleThemeButton, DirectionsInfo } from "../components"

const HomePage = () => {
  return (
    <div>
      <MapView />
      <ToMyLocation />
      <SearchBar />
      <ToggleThemeButton />
      <DirectionsInfo />
    </div>
  )
}

export default HomePage
