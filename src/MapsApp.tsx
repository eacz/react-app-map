import { useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { PlacesProvider, MapProvider, ThemeContext } from './context'
import { HomePage } from './pages'

const MapsApp = () => {
  const { currentTheme } = useContext(ThemeContext)

  return (
    <ThemeProvider theme={currentTheme}>
      <PlacesProvider>
        <MapProvider>
          <HomePage />
        </MapProvider>
      </PlacesProvider>
    </ThemeProvider>
  )
}

export default MapsApp
