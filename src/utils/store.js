import React from "react";
import setDefaultBoardIfNoPresent from "./setDefaultBoard";

export const StoreContext = React.createContext(null);
setDefaultBoardIfNoPresent();

export default ({ children }) => {
  const defaultData = JSON.parse(localStorage.getItem("trello_boards"));
  const [boards, setBoards] = React.useState(defaultData);
  const [themeStyle, setThemeStyle] = React.useState("light");
  console.log("defaultData 1     ", defaultData);
  const store = {
    boards: [boards, setBoards],
    themeStyle: [themeStyle, setThemeStyle],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
