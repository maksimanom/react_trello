const addBoard = (boards, title, setBoards)=>{
  let newBoardId = boards.reduce((prev, cur)=>{
    return prev.id > cur.id ? prev.id : cur.id;
  });
  newBoardId+=1;
  const newBoard = {id: newBoardId, title: title, tasks: [] };
  const newBoardsList = [...boards].concat([newBoard]); 
  setBoards(newBoardsList);
}
export default addBoard
