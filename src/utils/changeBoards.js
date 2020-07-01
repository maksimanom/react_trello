import { parse } from "date-fns";

const changeBoards = (
  setBoards,
  boards,
  boardId,
  cardId,
  cardText,
  cardDescription,
  cardDateEnd
) => {
  const newBoards = [...boards];
  const board = newBoards.find((board) => board.id === parseInt(boardId));
  const card = board.tasks.find((card) => card.id === parseInt(cardId));
  card.text = cardText;
  card.description = cardDescription;
  card.dateEnd = new Date(cardDateEnd);
  setBoards(newBoards);
  localStorage.setItem("trello_boards", JSON.stringify(newBoards));
};
export default changeBoards;
