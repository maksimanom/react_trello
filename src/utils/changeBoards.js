const changeBoards = (
  setBoards,
  boards,
  boardId,
  cardId,
  cardText,
  cardDescription,
  cardDateEnd
) => {
  const newBoards = boards.map((board) => {
    boardId = parseInt(boardId);
    cardId = parseInt(cardId);
    if (board.id === boardId) {
      board.tasks.map((card) => {
        if (card.id === cardId) {
          card.text = cardText;
          card.description = cardDescription;
          card.dateEnd = new Date(cardDateEnd);
        }
      });
    }
    return board;
  });
  setBoards(newBoards);
  localStorage.setItem("trello_boards", JSON.stringify(newBoards));
};
export default changeBoards;
