import React from "react";
import { makeStyles, ListItem, Tooltip, Box } from "@material-ui/core/";
import classnames from "classnames";
import moment from "moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link:{
    textDecoration: 'none',
    color: "inherit"
  },
  root: {
    backgroundColor: "#f7f7f7",
    margin: "1px 0",
    padding: 0,
    display: "block",
    wordBreak: "break-word",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
    "& .card": {
      display: "flex",
      padding: "2px 10px",
    },
    "& .cardForOneDay": {
      backgroundColor: "#ffff00",
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
    "& .cardInEndingDay": {
      backgroundColor: "#ffa600",
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
    "& .cardExpired": {
      background: "#960000",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
  },
}));

const daysDifference = (cardDateEnd) => {  
  const dateToday = new Date();
  const today = moment([
    dateToday.getFullYear(),
    dateToday.getMonth(),
    dateToday.getDate(),
  ]); 
  const dateEnd = moment(cardDateEnd);  
  const daysLeft = dateEnd.diff(today, "days");
  
  return daysLeft;
};

const ShowCard = ({ card, boardId }) => {
  const classes = useStyles();
  const daysLeft = daysDifference(card.dateEnd);

  return (
    <Link to={`/card/${boardId}/${card.id}`} className={classes.link}>
      <ListItem button className={classes.root}>
        <div
          className={classnames(
            "card",
            { cardForOneDay: daysLeft === 1 },
            { cardInEndingDay: (daysLeft === 0 && card.dateEnd!==undefined)},
            { cardExpired: daysLeft < 0 }
          )}
        >
          <Tooltip title={"Finish to: " + (card.dateEnd || "no info")} placement="top">
            <Box>
              <p>{card.text}</p>
            </Box>
          </Tooltip>
        </div>
      </ListItem>
    </Link>
  );
};
export default ShowCard;
