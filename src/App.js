import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Grid } from "@material-ui/core/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
  const classes = useStyles();
  const {
    ["boards"]: [boards, setBoards],
  } = React.useContext(StoreContext);

  return (
    <Router>
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={12}>
          <Header />
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
  );
};

export default App;
