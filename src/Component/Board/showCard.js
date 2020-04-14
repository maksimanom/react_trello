import React, { useRef } from "react";
import { makeStyles, ListItem, Tooltip, Box } from "@material-ui/core/";
import classnames from "classnames";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
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

const ShowCard = ({ card, boardId, index, moveCard }) => {
  const classes = useStyles();
  const daysLeft = daysDifference(card.dateEnd);
  const { id } = card;

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref}>
      <Link to={`/card/${boardId}/${card.id}`} className={classes.link}>
        <ListItem button className={classes.root}>
          <div
            className={classnames(
              "card",
              { cardForOneDay: daysLeft === 1 },
              { cardInEndingDay: daysLeft === 0 && card.dateEnd !== undefined },
              { cardExpired: daysLeft < 0 }
            )}
          >
            <Tooltip
              title={"Finish to: " + (card.dateEnd || "no info")}
              placement="top"
            >
              <Box>
                <p>{card.text}</p>
              </Box>
            </Tooltip>
          </div>
        </ListItem>
      </Link>
    </div>
  );
};
export default ShowCard;
