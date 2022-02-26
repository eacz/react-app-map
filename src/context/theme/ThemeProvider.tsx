import { FC, useReducer } from 'react'
import { DefaultTheme } from 'styled-components'
import { darkTheme, lightTheme } from '../../themes'
import ThemeContext from './ThemeContext'
import ThemeReducer from './ThemeReducer'

export interface ThemeState {
  currentTheme: DefaultTheme
}

const initialState: ThemeState = {
  currentTheme:
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme,
}

const ThemeProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState)

  const setDarkMode = () => {
    dispatch({type: 'setDarkTheme', payload: darkTheme})
  }
  const setLightMode = () => {
    dispatch({type: 'setLightTheme', payload: lightTheme})
  }

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        setDarkMode,
        setLightMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}


export default ThemeProvider