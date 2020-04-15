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
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import { withRouter } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import ShowCard from "./showCard";
import addCardToBoard from "../../utils/addCard";
import changeCardData from "../../utils/changeCardData";
import changeBoardsAfterDnd from "../../utils/changeBoardsAfterDnd";
import deleteBoard from "../../utils/deleteBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 10,
    minWidth: 250,
    maxWidth: 400,
    overflowY: "scroll",
    maxHeight: "100%",
    backgroundColor: "#fff",
    "& .board-title": {
      textAlign: "center",
      "& .delete-button": {
        color: "#de0000",
      },
      "& .MuiInputBase-input": {
        textAlign: "center",
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none",
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

const Board = (props) => {
  const { boardItem, boards, setBoards, userId } = props;
  if (userId !== "admin") props.history.push("/");
  const classes = useStyles();
  const [inputNewCardName, setInputNewCardName] = React.useState("");
  const [newCardName, setNewCardName] = React.useState(boardItem.title);
  const [visibleAddCardBlock, setVisibleAddCardBlock] = React.useState(false);
  const [tasks, setTasks] = React.useState(boardItem.tasks);

  useEffect(() => {
    changeBoardsAfterDnd(boards, setBoards, boardItem.id, tasks);
  }, [tasks]);

  const handleChange = (e) => {
    if (e.target.name === "new-card") setInputNewCardName(e.target.value);
    if (e.target.name === "board-title__input") setNewCardName(e.target.value);
  };
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
  const handleOnBlur = () => {
    if (newCardName !== "") {
      const newBoards = changeCardData(boards, boardItem.id, newCardName);
      setBoards(newBoards);
    }
    if (newCardName === "") setNewCardName(boardItem.title);
  };
  const handleDelete = ()=>{
    const newBoards = deleteBoard(boards, boardItem.id);    
    setBoards(newBoards);
  }
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = tasks[dragIndex];
      setTasks(
        update(tasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [tasks]
  );

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
        <DeleteForeverIcon
          className="delete-button"
          onClick={handleDelete}
        />
      </ListItem>
      <Divider component="span" />
      <DndProvider backend={Backend}>
        {tasks.map((card, index) => {
          return (
            <ShowCard
              key={index}
              card={card}
              boardId={boardItem.id}
              index={index}
              moveCard={moveCard}
              userId={userId}
            />
          );
        })}
      </DndProvider>
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
    </List>
  );
};

export default withRouter(Board);
