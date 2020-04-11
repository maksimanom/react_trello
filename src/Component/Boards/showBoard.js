import React from "react";

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
import changeCardName from "../../utils/changeCardName";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 10,
    backgroundColor: "#fff",
    "& .board-title": {
      textAlign: "center",
      "& .MuiInputBase-input":{
        textAlign: "center",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none",
      },
    },
    "& .board-item": {
      backgroundColor: "#f7f7f7",
      margin: "1px 0",
      "&:hover": {
        backgroundColor: "#737373",
        color: "#fff",
      },
    },
    "& .add-board-item": {
      fontSize: 12,
      paddingTop: 14,
      paddingBottom: 0,
    },
    "& .add-card-block": {
      display: "flex",
      flexDirection: "column",
      "& .add-card-block__button": {
        marginTop: 5,
        backgroundColor: "#5AAC44",
        alignSelf: "flex-start",
      },
    },
  },
}));

const Board = ({ boardItem, boards, setBoards }) => {
  const classes = useStyles();
  const [textOfNewCard, setTextOfNewCard] = React.useState("");
  const [newCardName, setNewCardName] = React.useState(boardItem.title);
  const [visibleAddCardBlock, setVisibleAddCardBlock] = React.useState(false);

  const handleChange = (e) => {
    if (e.target.name === "new-card") setTextOfNewCard(e.target.value);
    if (e.target.name === "board-title__input") setNewCardName(e.target.value);
  };
  const handleClick = (e) => {
    if (e.target.name === "change-add-card-visibility") {
      setVisibleAddCardBlock(!visibleAddCardBlock);
    }
    if (e.target.name === "add-card-block__button") {
      const boardsWithNewCard = addCardToBoard(
        boards,
        boardItem.id,
        textOfNewCard
      );
      setVisibleAddCardBlock(!visibleAddCardBlock);
      setTextOfNewCard("");
      setBoards(boardsWithNewCard);
    }
  };
  const handleOnBlur = () => {
    if (newCardName !== "") {      
      const newBoards = changeCardName(boards, boardItem.id, newCardName);
      setBoards(newBoards);
    }
  };

  return (
    <List component={Paper} className={classes.root}>
      <ListItem className="board-title">
        <TextField
          fullWidth
          multiline
          value={newCardName}
          name="board-title__input"
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={(e) => {
            handleOnBlur(e);
          }}
        />
      </ListItem>
      <Divider component="span" />
      {boardItem.tasks.map((task, index) => {
        return (
          <ListItem button key={index} className="board-item">
            {task.text}
          </ListItem>
        );
      })}
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
            value={textOfNewCard}
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
    </List>
  );
};

export default Board;
