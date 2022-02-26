import { MapView, SearchBar, ToMyLocation } from "../components"
import ToggleThemeButton from "../components/ToggleThemeButton"

const HomePage = () => {
  return (
    <div>
      <MapView />
      <ToMyLocation />
      <SearchBar />
      <ToggleThemeButton />
    </div>
  )
}

export default HomePage
