const changeCardName = (boards, boardId, newCardName) => {
  let newArray = boards.map((board) => {
    if (board.id === boardId) {
      board.title = newCardName;
    }
    return board;
  });
  console.log(newArray);
  return newArray;
};
export default changeCardName;
