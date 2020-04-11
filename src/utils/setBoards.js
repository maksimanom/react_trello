import { useContext } from "react";

const setBoards = (boards) => {
  const { boards, setBoards } = React.useContext(StoreContext);
  localStorage.setItem("trello_boards", JSON.stringify(boards));
};
export default setBoards;
