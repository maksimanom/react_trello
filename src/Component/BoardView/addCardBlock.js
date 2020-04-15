import React, { useCallback, useEffect } from "react";

import {
  makeStyles,
  List,
  ListItem,
  Divider,
  Paper,
  TextField,
  Button,
} from "@material-ui/core/";

import addCardToBoard from "../../utils/addCard";

const AddCardBlock = ({ boards, boardItem, setBoards }) => {
  const [inputNewCardName, setInputNewCardName] = React.useState("");
  const [visibleAddCardBlock, setVisibleAddCardBlock] = React.useState(false);
  const handleClick = (e) => {
    const target = e.currentTarget;
    if (target.name === "change-add-card-visibility") {
      setVisibleAddCardBlock(!visibleAddCardBlock);
    }
    if (target.name === "add-card-block__button" && inputNewCardName !== "") {
      const boardsWithNewCard = addCardToBoard(
        boards,
        boardItem.id,
        inputNewCardName
      );
      setVisibleAddCardBlock(!visibleAddCardBlock);
      setInputNewCardName("");
      setBoards(boardsWithNewCard);
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "new-card") setInputNewCardName(e.target.value);
  };

  return (
    <>
      {!visibleAddCardBlock ? (
        <ListItem
          button
          className="add-board-item"
          component="button"
          name="change-add-card-visibility"
          onClick={(e) => handleClick(e)}
        >
          Add another card
        </ListItem>
      ) : (
        <ListItem component="div" className="add-card-block">
          <TextField
            fullWidth
            multiline
            value={inputNewCardName}
            name="new-card"
            onChange={(e) => handleChange(e)}
          />
          <Button
            className="add-card-block__button"
            onClick={(e) => handleClick(e)}
            name="add-card-block__button"
          >
            Add card
          </Button>
        </ListItem>
      )}
    </>
  );
};
export default AddCardBlock;
