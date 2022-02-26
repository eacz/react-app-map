import React from 'react'
import ReactDOM from 'react-dom'
import MapsApp from './MapsApp'
import './globalStyles.css'
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'
import { ThemeProvider } from './context'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || ''

if (!navigator.geolocation) {
  alert("Your browser doesn't have a geolocation option")
  throw new Error("Your browser doesn't have a geolocation option")
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <MapsApp />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
