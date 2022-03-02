import { Suspense, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { PlacesProvider, MapProvider, ThemeContext } from './context'
import { HomePage, LoadingPage } from './pages'
import GlobalStyles from './themes/GlobalStyles'

const MapsApp = () => {
  const { currentTheme } = useContext(ThemeContext)
  return (
    <Suspense fallback={<LoadingPage />}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
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
