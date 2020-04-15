import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  "& #root":{
    height: 500
  },
  palette: {
    type: "light",
    main: "#3F51B5",
  },
});

export default theme;
