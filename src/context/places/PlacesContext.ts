import { createContext } from "react";

export interface placesContextProps {
  isLoading: boolean,
  userLocation?: [ number, number ],
}


const PlacesContext = createContext<placesContextProps>({} as placesContextProps)
export default PlacesContext