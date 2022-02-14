import { PlacesProvider } from './context'
import { HomePage } from './pages'
const MapsApp = () => {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  )
}

export default MapsApp
