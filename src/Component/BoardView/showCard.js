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
    "& .card": {
      display: "flex",
      padding: "2px 10px",
    },
    "& .cardForOneDay": {
      backgroundColor: "#ffff00",
    },
    "& .cardInEndingDay": {
      backgroundColor: "#ffa600",
    },
    "& .cardExpired": {
      background: "#960000",
      color: "#fff",
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

const ShowCard = ({ card, boardId, index, moveCard, userId }) => {
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
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const dateEndInfo = () => {
    const date = new Date(card.dateEnd);
    if (card.dateEnd)
      return `${date.getDate()}.${(date.getMonth()+1)}${date.getFullYear()}`;
    return "no info";
  };

  return (
    <div ref={ref}>
      <Link to={`/${userId}/${boardId}/${card.id}`} className={classes.link}>
        <ListItem button className={classes.root}>
          <div
            className={classnames(
              "card",
              { cardForOneDay: daysLeft === 1 },
              { cardInEndingDay: daysLeft === 0 && card.dateEnd !== undefined },
              { cardExpired: daysLeft < 0 }
            )}
          >
            <Tooltip title={"Finish to: " + dateEndInfo()} placement="top">
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
