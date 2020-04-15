const deleteBoard = (boards, boardId) => {
  const newBoards = boards.filter((board)=>{
    return board.id!==boardId
  });
  return newBoards;
};
export default deleteBoard;
