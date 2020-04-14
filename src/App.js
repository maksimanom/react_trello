import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Grid } from "@material-ui/core/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { StoreContext } from "./utils/store";
import Header from "./Component/Header";
import Boards from "./Component/Board";
import CardEdit from "./Component/CardFullView/cardEdit";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    background: "#3F51B5",
    flexDirection: "column",
    flexWrap: "nowrap",
    "& .boards": {
      width: "auto",
      minWidth: "100%",
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
          <Route path="/card/:boardId/:cardId">
            <CardEdit boards={boards} setBoards={setBoards} />
          </Route>
          <Route path="/">
            <Grid item className="boards">
              <Boards boards={boards} setBoards={setBoards} />
            </Grid>
          </Route>
        </Switch>
      </Grid>
    </Router>
  );
};

export default App;
