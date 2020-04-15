import { createMuiTheme, darken } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  palette: {
    main: "#3F51B5",
  },
});
const darkTheme = createMuiTheme({
  palette: {
    main: "#4a4a4a",
  },
});

const theme = (type) => {
  return type === "light" ? lightTheme : darkTheme;
};

export default theme;
