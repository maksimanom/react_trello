import React from "react";

import { withRouter } from "react-router-dom";
import { makeStyles, Paper, Box, TextField, Button } from "@material-ui/core/";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import changeBoards from "../../utils/changeBoards";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc( 100% - 52px )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    background: "transparent",
    "& .editor-wrapper": {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#fff",
      borderRadius: 3,
      padding: 10,
      "& .text-input-field":{
        padding: 10
      },
      "& .MuiTextField-root	": {
        background: "#fff",
      },
      "& .MuiButton-root	": {
        backgroundColor: "#5AAC44",
        color: "#fff",
      },
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
    <Box className={classes.root}>
      <Box className="editor-wrapper">
        <TextField
          fullWidth
          multiline
          value={cardText}
          name="cardText"
          placeholder="Card name"
          onChange={(e) => handleChange(e)}
          className="text-input-field"
        ></TextField>
        <TextField
          fullWidth
          multiline
          placeholder="Card description"
          value={cardDescription}
          name="cardDescription"
          onChange={(e) => handleChange(e)}
          className="text-input-field"
        ></TextField>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Deadline"
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
    </Box>
  );
};

export default withRouter(CardEdit);
