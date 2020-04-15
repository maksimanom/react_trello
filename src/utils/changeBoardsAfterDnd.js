const changeBoardsAfterDnd = (boards, setBoards, boardId, newTasks) => {
  const newBoards = boards.map((board) => {
    if (board.id === boardId) {
      board.tasks=newTasks;
    }
    return board;
  });
  setBoards(newBoards);
};
export default changeBoardsAfterDnd;
