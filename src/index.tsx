import React from 'react';
import ReactDOM from 'react-dom';
import MapsApp from './MapsApp';
import './globalStyles.css'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken=process.env.REACT_APP_MAPBOX_TOKEN || ''


if(!navigator.geolocation){
  alert("Your browser doesn't have a geolocation option")
  throw new Error("Your browser doesn't have a geolocation option")
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

