const addCardToBoard = (boards, boardId, text) => {
  const newBoards = [...boards];
  const board = newBoards.find((board) => board.id === boardId);
  const maxId = () => {
    if (board.tasks.length) {
      return Math.max.apply(
        0,
        board.tasks.map((task) => task.id)
      );
    } else {
      return -1;
    }
  };
  board.tasks.push({
    id: maxId() + 1,
    text: text,
  });
  return newBoards;
};
export default addCardToBoard;
