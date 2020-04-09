import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Toolbar, TextField } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#0079BF",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" component="header">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Your Trello board
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
