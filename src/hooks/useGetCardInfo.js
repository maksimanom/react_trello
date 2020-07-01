import React from "react";
const useGetCardInfo = (boards, boardId, cardId) => {
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
  const [cardText, setCardText] = React.useState(cardTextDefault);
  const [cardDescription, setCardDescription] = React.useState(
    cardDescriptionDefault
  );
  const [selectedDate, setSelectedDate] = React.useState(
    cardDateEnd || new Date()
  );
  return {
    cardText,
    setCardText,
    cardDescription,
    setCardDescription,
    selectedDate,
    setSelectedDate,
  };
};
export default useGetCardInfo;
