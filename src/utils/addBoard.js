const addBoard = (boards, title)=>{
  let newBoardId = boards.reduce((prev, cur)=>{
    return prev.id > cur.id ? prev.id : cur.id;
  });
  newBoardId+=1;
  const newBoard = {id: newBoardId, title: title, tasks: [] };
  boards.push(newBoard);
  console.log(newBoard);
  console.log(boards);
  
}
export default addBoard
