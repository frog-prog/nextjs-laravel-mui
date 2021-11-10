import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    type:"light",
    primary: {
      main: '#ff5900',
      light: '#f1cfbd',
      dark: '#a63a00'
    },
    secondary: {
      main: '#162eae',
      light: '#cbd1f3',
      dark: '#071871'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    }
  },
});
export default theme;
