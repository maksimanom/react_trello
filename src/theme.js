import { createMuiTheme, darken } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          "& #root": {
            height: "100%",
          },
        },
      },
    },
  },
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
