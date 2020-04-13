import React, { useContext, useEffect } from "react";

import { Button, makeStyles, TextField, Box, Paper } from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";

import { StoreContext } from "../../utils/store";
import Board from "./showBoard";
import addBoard from "../../utils/addBoard";

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

const Boards = () => {
  const classes = useStyles();
  const {
    ["boards"]: [boards, setBoards],
  } = React.useContext(StoreContext);
  const [visibleAddNewBoard, setVisibleAddNewBoard] = React.useState(false);
  const [addBoardInputValue, setAddBoardInputValue] = React.useState("");

  useEffect(() => {
    console.log("boards in index:\n", boards);
    localStorage.setItem("trello_boards", JSON.stringify(boards));
  }, [boards]);

  const handleClick = (e) => {
    if (e.target.name === "add-another-board-button") {
      setVisibleAddNewBoard(!visibleAddNewBoard);
    }
    if (e.target.name === "add-board") {
      addBoard(boards, addBoardInputValue, setBoards);
      setVisibleAddNewBoard(!visibleAddNewBoard);
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "new-board-name") {
      setAddBoardInputValue(e.target.value);
    }
  };

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
      {!visibleAddNewBoard ? (
        <Button
          variant="contained"
          name="add-another-board-button"
          className="add-board-button"
          startIcon={<AddIcon />}
          onClick={(e) => handleClick(e)}
        >
          Add another list
        </Button>
      ) : (
        <Box className="add-board-wrapper" component={Paper}>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            name="new-board-name"
            value={addBoardInputValue}
            onChange={(e) => handleChange(e)}
          />
          <Button name="add-board" onClick={(e) => handleClick(e)}>
            Add List
          </Button>
        </Box>
      )}
    </main>
  );
};
export default Boards;
