import React from "react";

import { withRouter } from "react-router-dom";
import { makeStyles, Paper, Box, TextField, Button } from "@material-ui/core/";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

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
  let cardDateEnd = "";
  boards.map((board) => {
    if (board.id === boardId) {
      board.tasks.map((card) => {
        if (card.id === cardId) {
          cardTextDefault = card.text;
          cardDescriptionDefault = card.description;
          cardDateEnd = card.dateEnd;
        }
        return 0;
      });
    }
  });
  return { cardTextDefault, cardDescriptionDefault, cardDateEnd };
};

const CardEdit = (props) => {
  const classes = useStyles();
  const { boards, setBoards, match } = props;
  const { boardId, cardId } = match.params;
  const { cardTextDefault, cardDescriptionDefault, cardDateEnd } = getCardInfo(
    boards,
    boardId,
    cardId
  );
  const [cardText, setCardText] = React.useState(cardTextDefault);
  const [cardDescription, setCardDescription] = React.useState(
    cardDescriptionDefault
  );
  const [selectedDate, setSelectedDate] = React.useState(
    cardDateEnd || new Date()
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChange = (e) => {
    if (e.target.name === "cardText") {
      setCardText(e.target.value);
    }
    if (e.target.name === "cardDescription") {
      setCardDescription(e.target.value);
    }
  };
  const handleClick = () => {
    changeBoards(
      setBoards,
      boards,
      boardId,
      cardId,
      cardText,
      cardDescription,
      selectedDate
    );
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="yyyy/MM/dd"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button onClick={(e) => handleClick(e)}>Save</Button>
    </Box>
  );
};

export default withRouter(CardEdit);
