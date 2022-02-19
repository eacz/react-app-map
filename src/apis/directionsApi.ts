import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    overview: 'simplified',
    geometries: 'geojson',
    alternatives: false,
    steps: false,
    access_token: process.env.REACT_APP_MAPBOX_TOKEN
  }
})

export default directionsApi