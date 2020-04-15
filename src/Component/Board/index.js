import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/";

import Board from "./showBoard";
import AddBoardBlock from "./addBoardBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    color: "#000",
    display: "flex",
    flexFlow: "row nowrap",
    padding: 10,
    height: "100%",
    alignItems: "flex-start",
    "& .board-wrapper":{
      display: 'flex',
      height: "100%",
      alignItems: 'flex-start',
    },
    "& .MuiButton-root": {
      background: "rgba(255, 255, 255, 0.5)",
      color: "#fff",
      fontSize: 14,
    },
    "& .add-board-wrapper": {
      padding: 5,
      height: "fit-content",
      background: "#fff",
      color: "#000",
      width: 250,
      minWidth: 250,
      "& .MuiButton-root": {
        marginTop: 5,
        backgroundColor: "#5AAC44",
      },
      "& .MuiInputBase-root": {
        padding: 5,
      },
    },
  },
}));

const Boards = ({ boards, setBoards }) => {
  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem("trello_boards", JSON.stringify(boards));
  }, [boards]);

  return (
    <main className={classes.root}>
      <div className="board-wrapper">
        {boards.map((boardItem, index) => {
          return (
            <Board
              key={index}
              boardItem={boardItem}
              boards={boards}
              setBoards={setBoards}
            ></Board>
          );
        })}
      </div>
      <AddBoardBlock boards={boards} setBoards={setBoards} />
    </main>
  );
};
export default Boards;
