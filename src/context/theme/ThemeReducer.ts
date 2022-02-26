import { ThemeState } from "./ThemeProvider"
import { DefaultTheme } from 'styled-components';

type actionsType = 
| { type: 'setDarkTheme', payload: DefaultTheme }
| { type: 'setLightTheme', payload: DefaultTheme }

const ThemeReducer = (state: ThemeState, action: actionsType ) : ThemeState => {
  switch(action.type){
    case 'setDarkTheme':
      return {...state, currentTheme: action.payload}
    case 'setLightTheme':
      return {...state, currentTheme: action.payload}
    default:
      return state;
  }
}


export default ThemeReducer