import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Grid } from "@material-ui/core/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "./theme";
import { StoreContext } from "./utils/store";
import LoginPage from "./Component/LoginPage";
import Header from "./Component/Header";
import Boards from "./Component/Board";
import CardEdit from "./Component/CardFullView/cardEdit";
import DataView from "./Component";

document.querySelector("html").style.height = "100%";
document.querySelector("body").style.height = "100%";
document.querySelector(".root").style.height = "100%";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: theme.palette.main,
    display: "block",
    "& .boards": {
      width: "auto",
      minWidth: "100%",
      height: "calc( 100% - 52px )",
    },
  },
}));

const App = () => {
  const {
    ["boards"]: [boards, setBoards],
  } = React.useContext(StoreContext);
  const {
    ["themeStyle"]: [themeStyle, setThemeStyle],
  } = React.useContext(StoreContext);
  const classes = useStyles();
  console.error("boards IN INDEX", boards);

  return (
    <ThemeProvider theme={theme(themeStyle)}>
      <DataView themeStyle={themeStyle} setThemeStyle={setThemeStyle} />
    </ThemeProvider>
  );
};

export default App;
