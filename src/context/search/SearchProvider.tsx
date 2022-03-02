import { FC, useState } from "react"
import { SearchContext } from "..";

const SearchProvider: FC = ({children}) => {
  const [showResults, setShowResult] = useState(false)
  
  const setShowResults = (value: boolean) => {
    setShowResult(value)
  }

  return (
    <SearchContext.Provider
      value={{
        showResults,
        setShowResults
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
