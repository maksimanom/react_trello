const addCardToBoard = (boards, boardId, text) => {
  let newBoards = boards.map((board) => {
    if (board.id === boardId) {
      let id=0;
      if (board.tasks && board.tasks.length>=1) {
        id = board.tasks.reduce((prev, cur) => {
        return prev.id>cur.id ? prev.id : cur.id;
      }); }
      board.tasks.push({ id: id + 1, text: text, dateEnd: "no" });
    }
    return board
  });  
  return newBoards;
};
export default addCardToBoard;
