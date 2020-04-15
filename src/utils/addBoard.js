const addBoard = (boards, title, setBoards) => {
  let newBoardId = boards.map((board) => {
    return Math.max.apply(
      null,
      boards.map((board) => board.id)
    );
  });
  newBoardId += 1;
  const newBoard = { id: newBoardId, title: title, tasks: [] };
  const newBoardsList = [...boards].concat([newBoard]);
  setBoards(newBoardsList);
};
export default addBoard;
