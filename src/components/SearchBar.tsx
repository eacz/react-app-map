import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"

const SearchBar = () => {

  const debounceRef = useRef<NodeJS.Timeout>()
  const { searchPlacesByTerm } = useContext(PlacesContext)

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(debounceRef.current ){
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(e.target.value)
    }, 350);
  }

  return (
    <div className="search-container" >
      <input type="text" className="form-control" placeholder="Search Place" onChange={onQueryChange} />
    </div>
  )
}

export default SearchBar
