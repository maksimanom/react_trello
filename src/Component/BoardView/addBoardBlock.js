import React from "react";

import { Button, TextField, Box, Paper, makeStyles } from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import addBoard from "../../utils/addBoard";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  addButton: {
    minWidth: 250,
  }
}));

const AddBoardBlock = ({ boards, setBoards }) => {
  const classes= useStyles();
  const [visibleAddNewBoard, setVisibleAddNewBoard] = React.useState(false);
  const [addBoardInputValue, setAddBoardInputValue] = React.useState("");

  const handleClick = (e) => {
    if (e.currentTarget.name === "add-another-board-button") {
      setVisibleAddNewBoard(!visibleAddNewBoard);
    }
    if (e.currentTarget.name === "add-board" && addBoardInputValue!=="") {
      addBoard(boards, addBoardInputValue, setBoards);
      setVisibleAddNewBoard(!visibleAddNewBoard);
      setAddBoardInputValue("");
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "new-board-name") {
      setAddBoardInputValue(e.target.value);
    }
  };

  return (
    <>
      {!visibleAddNewBoard ? (
        <Button
          variant="contained"
          name="add-another-board-button"
          className={classes.addButton}
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
    </>
  );
};
export default AddBoardBlock;
