import { Suspense, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { PlacesProvider, MapProvider, ThemeContext } from './context'
import { HomePage, LoadingPage } from './pages'

const MapsApp = () => {
  const { currentTheme } = useContext(ThemeContext)
  return (
    <Suspense fallback={<LoadingPage />}>
      <ThemeProvider theme={currentTheme}>
        <PlacesProvider>
          <MapProvider>
            <HomePage />
          </MapProvider>
        </PlacesProvider>
      </ThemeProvider>
    </Suspense>
  )
}

export default MapsApp
