import { MapView, SearchBar, ToMyLocation } from "../components"
import DirectionsInfo from "../components/DirectionsInfo"
import ToggleThemeButton from "../components/ToggleThemeButton"

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
