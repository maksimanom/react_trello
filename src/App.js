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
      <Router>
        <Grid container className={classes.root}>
          <CssBaseline />
          <Grid item xs={12}>
            <Header setThemeStyle={setThemeStyle} themeStyle={themeStyle} />
          </Grid>
          <Switch>
            <Route path="/:userId/:boardId/:cardId">
              <CardEdit boards={boards} setBoards={setBoards} />
            </Route>
            <Route path="/:userId">
              <Grid item className="boards">
                <Boards boards={boards} setBoards={setBoards} />
              </Grid>
            </Route>
            <Route path="/">
              <Grid item className="boards">
                <LoginPage />
              </Grid>
            </Route>
          </Switch>
        </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;
