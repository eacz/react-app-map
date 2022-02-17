import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface placesContextProps {
  isLoading: boolean,
  userLocation?: [ number, number ],
  isLoadingPlaces: boolean,
  places: Feature[],
  searchPlacesByTerm: (query: string) => Promise<Feature[]>
}


const PlacesContext = createContext<placesContextProps>({} as placesContextProps)
export default PlacesContext