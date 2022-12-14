import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { colors } from "../colors";

const themeConfig = {
  palette: {
    primary: colors.green,
    secondary: colors.green,
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
}

const theme = createMuiTheme(themeConfig);

export function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
