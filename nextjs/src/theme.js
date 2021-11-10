import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
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
