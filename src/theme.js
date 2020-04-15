import { createMuiTheme, darken } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  palette: {
    main: "#3F51B5",
  },
});
const darkTheme = createMuiTheme({
  palette: {
    main: "red",
  },
});

const theme = (type) => {
  return type === "light" ? lightTheme : darkTheme;
};

export default theme;
