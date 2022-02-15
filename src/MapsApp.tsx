import { PlacesProvider, MapProvider } from './context'
import { HomePage } from './pages'
const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  )
}

export default MapsApp
