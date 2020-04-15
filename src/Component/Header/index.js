import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 0 10px 10px",
    backgroundColor: theme.palette.main,
    "& .name": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
}));

const Header = ({ setThemeStyle, themeStyle }) => {
  const classes = useStyles();

  const handleClick = () => {
    themeStyle === "light" ? setThemeStyle("dark") : setThemeStyle("light");
  };

  return (
    <AppBar position="static" component="header" className={classes.root}>
      <Typography
        variant="h6"
        color="inherit"
        className="name"
        onClick={() => handleClick()}
      >
        Your Trello board
      </Typography>
    </AppBar>
  );
};
export default Header;
