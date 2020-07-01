const addBoard = (boards, title, setBoards) => {
  const findMaxBoardId = () => {
    if (boards.length) {
      return Math.max.apply(
        null,
        boards.map((board) => board.id)
      );
    }
    return -1;
  };
  const newBoard = {
    id: findMaxBoardId() + 1,
    title: title,
    tasks: [],
  };
  setBoards(prev => [...prev, newBoard]);
};
export default addBoard;
