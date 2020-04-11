const addCardToBoard = (boards, boardId, text) => {
  let newArray = boards.map((board) => {
    if (board.id === boardId) {
      const maxId = board.tasks.reduce((prev, cur) => {
        return prev.id>cur.id ? prev.id : cur.id;
      });     
      board.tasks.push({ id: maxId + 1, text: text, dateEnd: "no" });
    }
    return board
  });  
  return newArray;
};
export default addCardToBoard;
