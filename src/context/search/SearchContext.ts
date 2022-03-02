import { createContext } from "react";

export interface searchContextProps {
  showResults: boolean
  setShowResults: (value: boolean) => void
}


const SearchContext = createContext<searchContextProps>({} as searchContextProps)
export default SearchContext