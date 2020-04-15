const addCardToBoard = (boards, boardId, text) => {
  let newBoards = boards.map((board) => {
    if (board.id === boardId) {
      let id = 0;
      if (board.tasks && board.tasks.length >= 1) {
        id = Math.max.apply(
          null,
          board.tasks.map((task) => task.id)
        );
      }
      board.tasks.push({ id: id + 1, text: text });
    }
    return board;
  });
  return newBoards;
};
export default addCardToBoard;
