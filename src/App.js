import React from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./theme";
import { StoreContext } from "./utils/store";
import DataView from "./Component";

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
