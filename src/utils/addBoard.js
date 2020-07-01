const addBoard = (boards, title, setBoards) => {
  let newBoardId = Math.max.apply(
    null,
    boards.map((board) => board.id)
  );
  newBoardId += 1;
  const newBoard = {
    id: newBoardId === null ? 0 : newBoardId,
    title: title,
    tasks: [],
  };
  const newBoardsList = [...boards].concat([newBoard]);
  setBoards(newBoardsList);
};
export default addBoard;
