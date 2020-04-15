import React from "react";

import { withRouter } from "react-router-dom";
import { makeStyles, Box, TextField, Button } from "@material-ui/core/";
const LOGIN = "admin";
const PASS = "pass";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc( 100% - 52px )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
    "& .login-wrapper": {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#fff",
      borderRadius: 3,
      padding: 10,
      "& .MuiFormControl-root": {
        paddingBottom: 10,
      },
    },
  },
}));

const LoginPage = (props) => {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  if (currentUser === "admin") props.history.push(`/${currentUser}`);
  const classes = useStyles();

  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");

  const handleClick = () => {
    if (login !== "" && pass !== "") {
      if (login === LOGIN && pass === PASS) {
        sessionStorage.setItem("user", JSON.stringify(login))
        props.history.push(`/boards/${login}`);
      }
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "login") setLogin(e.target.value);
    if (e.target.name === "password") setPass(e.target.value);
  };

  return (
    <Box className={classes.root}>
      <form className="login-wrapper">
        <TextField
          required
          name="login"
          id="login"
          placeholder="Login"
          fullWidth
          value={login}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          value={pass}
          autoComplete="current-password"
          onChange={(e) => handleChange(e)}
        />
        <Button onClick={handleClick}>Login</Button>
      </form>
    </Box>
  );
};
export default withRouter(LoginPage);
