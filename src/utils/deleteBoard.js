const deleteBoard = (boards, boardId) => {
  const newBoards = boards.filter((board) => board.id !== boardId);
  return newBoards.concat([]);
};
export default deleteBoard;
