import {  DefaultTheme } from 'styled-components';
import { createContext } from 'react';

export interface ThemeContextProps {
  currentTheme:  DefaultTheme,
  setDarkMode: () => void,
  setLightMode: () => void,
}

const ThemeContext = createContext({} as ThemeContextProps)
export default ThemeContext