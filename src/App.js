import React, {useContext, useEffect} from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./Component/Header";
import Boards from "./Component/Boards";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .boards":{
      width: "auto",
      minWidth: '100%'
    }
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item className="boards">
        <Boards />
      </Grid>
    </Grid>
  );
};

export default App;
