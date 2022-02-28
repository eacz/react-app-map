import { useContext } from 'react'
import { ThemeContext } from '../context'
import { FabButton } from './';



const ToggleThemeButton = () => {
  const { currentTheme, setDarkMode, setLightMode } = useContext(ThemeContext)

  const handleClick = () => {
    if (currentTheme.type === 'dark') {
      setLightMode()
    } else {
      setDarkMode()
    }
  }

  return (
    <FabButton top={20} right={60} onClick={handleClick}>
      {currentTheme.type === 'dark' ? <i className='fas fa-sun'></i> : <i className='fas fa-moon'></i>}
    </FabButton>
  )
}

export default ToggleThemeButton
