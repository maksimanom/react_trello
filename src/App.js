import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import { StoreContext } from "./utils/store";
import DataView from "./Component";

document.querySelector("html").style.height = "100%";
document.querySelector("body").style.height = "100%";
document.querySelector(".root").style.height = "100%";

const App = () => {
  const {
    ["themeStyle"]: [themeStyle, setThemeStyle],
  } = React.useContext(StoreContext);

  return (
    <ThemeProvider theme={theme(themeStyle)}>
      <DataView themeStyle={themeStyle} setThemeStyle={setThemeStyle} />
    </ThemeProvider>
  );
};

export default App;
