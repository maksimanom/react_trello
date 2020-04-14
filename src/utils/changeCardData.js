const changeCardData = (boards, boardId, newCardName) => {
  let newArray = boards.map((board) => {
    if (board.id === boardId) {
      board.title = newCardName;
    }
    return board;
  });
  return newArray;
};
export default changeCardData;
