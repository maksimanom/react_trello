import React, { useEffect } from "react";

import { Button, makeStyles, TextField, Box, Paper } from "@material-ui/core/";

import Board from "./showBoard";
import AddBoardBlock from "./addBoardBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    color: "#000",
    display: "flex",
    flexFlow: "row nowrap",
    margin: 10,
    "& .MuiButton-root": {
      background: "rgba(255, 255, 255, 0.5)",
      color: "#fff",
      fontSize: 14,
    },
    "& .add-board-button": {
      height: "fit-content",
      minWidth: 200,
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

const Boards = ({boards, setBoards}) => {
  const classes = useStyles();

  useEffect(() => {
    console.error("BOARDS IN INDEX:\n", boards);
  }, [boards]);  

  return (
    <main className={classes.root}>
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
      <AddBoardBlock boards={boards} setBoards={setBoards}/>
    </main>
  );
};
export default Boards;
