import React from "react";
import { makeStyles, ListItem, Tooltip, Box } from "@material-ui/core/";
import classnames from "classnames";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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
  const todayMoment = moment([
    dateToday.getFullYear(),
    dateToday.getMonth() + 1,
    dateToday.getDate(),
  ]);
  const dateEnd = cardDateEnd.split(".");
  const dateEndMoment = moment(
    dateEnd.map((str) => {
      return parseInt(str);
    })
  );
  const daysLeft = dateEndMoment.diff(todayMoment, "days");
  return daysLeft;
};

const ShowCard = ({ card }) => {
  const classes = useStyles();

  const daysLeft = daysDifference(card.dateEnd);

  return (
    <ListItem button className={classes.root}>
      <div
        className={classnames(
          "card",
          { cardForOneDay: daysLeft === 1 },
          { cardInEndingDay: daysLeft == 0 },
          { cardExpired: daysLeft < 0 }
        )}
      >
        <Tooltip title={"Finish to: " + card.dateEnd} placement="top">
          <Box>
            <p>{card.text}</p>
          </Box>
        </Tooltip>
      </div>
    </ListItem>
  );
};
// это доделать для даты
export default ShowCard;
