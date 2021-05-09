import { createMuiTheme } from "@material-ui/core/styles";
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#455a64",
      light: "#718792",
      dark: "#1c313a",
    },
    secondary: {
      main: "#c5e1a5",
      light: "#f8ffd7",
      dark: "#94af76",
    },
    error: {
      main: "#DB5461",
    },
    background: {
      default: "#f1f8e9",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        marginRight: "5px",
      },
    },
  },
});
export default theme;
