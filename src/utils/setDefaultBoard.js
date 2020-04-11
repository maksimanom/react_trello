const ls = localStorage;
const setDefaultBoardIfNoPresent = () => {
  if (
    JSON.parse(ls.getItem("trello_boards")) === null ||
    JSON.parse(ls.getItem("trello_boards")) === undefined ||
    JSON.parse(ls.getItem("trello_boards")).length === 0
  ) {
    ls.setItem(
      "trello_boards",
      JSON.stringify([
        {
          id: 0,
          title: "Header 1",
          tasks: [
            { id: 0, text: "Element 1.1", dateEnd: "no" },
            { id: 1, text: "Element 1.2", dateEnd: "no" },
            { id: 2, text: "Element 1.3", dateEnd: "no" },
            { id: 3, text: "Element 1.4", dateEnd: "no" },
            { id: 4, text: "Element 1.5", dateEnd: "no" },
          ],
        },
        {
          id: 1,
          title: "Header 2",
          tasks: [
            { id: 0, text: "Element 2.1", dateEnd: "no" },
            { id: 1, text: "Element 2.2", dateEnd: "no" },
            { id: 2, text: "Element 2.3", dateEnd: "no" },
            { id: 3, text: "Element 2.4", dateEnd: "no" },
            { id: 4, text: "Element 2.5", dateEnd: "no" },
          ],
        },
      ])
    );
  }
};

export default setDefaultBoardIfNoPresent;
