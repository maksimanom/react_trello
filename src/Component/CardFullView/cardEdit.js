import React from "react";

import { withRouter } from "react-router-dom";
import { makeStyles, Paper, Box, TextField, Button } from "@material-ui/core/";
import { Link } from "react-router-dom";

import { StoreContext } from "../../utils/store";
import changeBoards from "../../utils/changeBoards";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: 500,
    background: "transparent",
    "& .MuiTextField-root	": {
      background: "#fff",
    },
    "& .MuiButton-root	": {
      backgroundColor: "#5AAC44",
      color: "#fff",
    },
  },
}));

const getCardInfo = (boards, boardId, cardId) => {
  boardId = parseInt(boardId);
  cardId = parseInt(cardId);
  let cardTextDefault = "";
  let cardDescriptionDefault = "";
  boards.map((board) => {
    if (board.id === boardId) {
      board.tasks.map((task) => {
        if (task.id === cardId) {
          cardTextDefault = task.text;
          cardDescriptionDefault = task.description;
        }
        return 0;
      });
    }
  });
  return { cardTextDefault, cardDescriptionDefault };
};

const CardEdit = (props) => {
  const classes = useStyles();
  const { match } = props;
  
  const { boardId, cardId } = match.params;
  const {
    ["boards"]: [boards, setBoards],
  } = React.useContext(StoreContext);
  const { cardTextDefault, cardDescriptionDefault } = getCardInfo(
    boards,
    boardId,
    cardId
  );
  const [cardText, setCardText] = React.useState(cardTextDefault);
  const [cardDescription, setCardDescription] = React.useState(
    cardDescriptionDefault
  );
  const handleChange = (e) => {
    if (e.target.name === "cardText") {
      setCardText(e.target.value);
    }
    if (e.target.name === "cardDescription") {
      setCardDescription(e.target.value);
    }
  };
  const handleClick = () => {
    changeBoards(setBoards, boards, boardId, cardId, cardText, cardDescription);
    props.history.push("/");
  };

  return (
    <Box className={classes.root} component={Paper}>
      <TextField
        fullWidth
        multiline
        value={cardText}
        name="cardText"
        onChange={(e) => handleChange(e)}
      ></TextField>
      <TextField
        fullWidth
        multiline
        value={cardDescription}
        name="cardDescription"
        onChange={(e) => handleChange(e)}
      ></TextField>
      <Button onClick={(e) => handleClick(e)}>Save</Button>
    </Box>
  );
};

export default withRouter(CardEdit);
