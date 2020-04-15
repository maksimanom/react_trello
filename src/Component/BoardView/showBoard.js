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
import AddCardBlock from "./addCardBlock";
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
  const [newBoardName, setNewBoardName] = React.useState(boardItem.title);

  const [tasks, setTasks] = React.useState(boardItem.tasks);

  useEffect(() => {
    changeBoardsAfterDnd(boards, setBoards, boardItem.id, tasks);
  }, [tasks]);

  const handleChange = (e) => {
    if (e.target.name === "board-title__input") setNewBoardName(e.target.value);
  };
  const handleOnBlur = () => {
    if (newBoardName !== "") {
      const newBoards = changeCardData(boards, boardItem.id, newBoardName);
      setBoards(newBoards);
    }
    if (newBoardName === "") setNewBoardName(boardItem.title);
  };
  const handleDelete = () => {
    const newBoards = deleteBoard(boards, boardItem.id);
    setBoards(newBoards);
  };
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
          value={newBoardName}
          name="board-title__input"
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={(e) => {
            handleOnBlur(e);
          }}
        />
        <DeleteForeverIcon className="delete-button" onClick={handleDelete} />
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
      <AddCardBlock
        boards={boards}
        boardItem={boardItem}
        setBoards={setBoards}
      />
    </List>
  );
};

export default withRouter(Board);
