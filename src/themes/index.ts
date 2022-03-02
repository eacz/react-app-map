import { DefaultTheme } from 'styled-components'
export { default as GlobalStyles } from './GlobalStyles'

export type themeTypes = 'light' | 'dark'
export type mapTheme = 'light-v10' | 'dark-v10'

declare module 'styled-components' {
  export interface DefaultTheme {
    type: themeTypes
    mapTheme: mapTheme
    backgroundColor: string
    fontColor: string
    primary: string
  }
}

export const lightTheme: DefaultTheme = {
  type: 'light',
  mapTheme: 'light-v10',
  backgroundColor: '#e2e2e2',
  primary: 'blue',
  fontColor: '#262626',
}

export const darkTheme: DefaultTheme = {
  type: 'dark',
  mapTheme: 'dark-v10',
  backgroundColor: '#1f1f1f',
  primary: 'blue',
  fontColor: '#ffffff',
}
