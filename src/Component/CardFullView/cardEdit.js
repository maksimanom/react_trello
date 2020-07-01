import React from "react";

import { withRouter } from "react-router-dom";
import { makeStyles, Box, TextField, Button } from "@material-ui/core/";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import changeBoards from "../../utils/changeBoards";
import useGetCardInfo from "../../hooks/useGetCardInfo";

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
      "& .text-input-field": {
        padding: 10,
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

const CardEdit = (props) => {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  if (currentUser !== "admin") props.history.push("/");
  const classes = useStyles();
  const { boards, setBoards, match } = props;
  const { boardId, cardId } = match.params;
  const {
    cardText,
    setCardText,
    cardDescription,
    setCardDescription,
    selectedDate,
    setSelectedDate,
  } = useGetCardInfo(boards, boardId, cardId);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "cardText":
        setCardText(e.target.value);
        break;
      case "cardDescription":
        setCardDescription(e.target.value);
        break;
      default:
        break;
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
    props.history.push(`/${currentUser}`);
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
        <Button onClick={handleClick}>Save</Button>
      </Box>
    </Box>
  );
};

export default withRouter(CardEdit);
