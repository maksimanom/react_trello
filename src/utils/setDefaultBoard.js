const ls = localStorage;
const trelloBoards = JSON.parse(ls.getItem("trello_boards"));
const setDefaultBoardIfNoPresent = () => {
  if (!trelloBoards?.length) {
    ls.setItem(
      "trello_boards",
      JSON.stringify([
        {
          id: 0,
          title: "Header 1",
          tasks: [
            {
              id: 0,
              text: "Element 1.1",
              description: "",
            },
            {
              id: 1,
              text: "Element 1.2",
              description: "",
            },
            {
              id: 2,
              text: "Element 1.3",
              description: "",
            },
            {
              id: 3,
              text: "Element 1.4",
              description: "",
            },
            {
              id: 4,
              text: "Element 1.5",
              description: "",
            },
          ],
        },
        {
          id: 1,
          title: "Header 2",
          tasks: [
            {
              id: 0,
              text: "Element 2.1",
              description: "",
            },
            {
              id: 1,
              text: "Element 2.2",
              description: "",
            },
            {
              id: 2,
              text: "Element 2.3",
              description: "",
            },
            {
              id: 3,
              text: "Element 2.4",
              description: "",
            },
            {
              id: 4,
              text: "Element 2.5",
              description: "",
            },
          ],
        },
      ])
    );
  }
};

export default setDefaultBoardIfNoPresent;
