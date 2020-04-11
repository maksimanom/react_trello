import React, { useContext, useEffect } from "react";

import { Button, makeStyles } from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";

import { StoreContext } from "../../utils/store";
import Board from "./showBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3F51B5",
    padding: "10px 0 10px 30px",
    overflow: "auto",
    color: "#000",
    display: "flex",
    flexFlow: "row nowrap",
    "& .MuiButton-root": {
      background: "rgba(255, 255, 255, 0.5)",
      color: "#fff",
      fontSize: 14,
    },
  },
}));

const Boards = () => {
  const {
    ["boards"]: [boards, setBoards],
  } = React.useContext(StoreContext);

  // useEffect(() => {
  //   localStorage.setItem("trello_boards", boards);
  // }, []);

  console.log(boards);
  
  const classes = useStyles();

  return (
    <main className={classes.root}>
      {boards.map((boardItem, index) => {
        return (
          <Board
            key={index}
            boardItem={boardItem}
            boards={boards}
            setBoards={(newBoards) => setBoards(newBoards)}
          ></Board>
        );
      })}
      <Button variant="contained" startIcon={<AddIcon />}>
        Add another list
      </Button>
    </main>
  );
};
export default Boards;
