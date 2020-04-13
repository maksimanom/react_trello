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
            { id: 0, text: "Element 1.1", dateEnd: "2020.04.11" },
            { id: 1, text: "Element 1.2", dateEnd: "2020.04.12" },
            { id: 2, text: "Element 1.3", dateEnd: "2020.04.13" },
            { id: 3, text: "Element 1.4", dateEnd: "2020.04.14" },
            { id: 4, text: "Element 1.5", dateEnd: "2020.04.15" },
          ],
        },
        {
          id: 1,
          title: "Header 2",
          tasks: [
            { id: 0, text: "Element 2.1", dateEnd: "2020.04.09" },
            { id: 1, text: "Element 2.2", dateEnd: "2020.04.10" },
            { id: 2, text: "Element 2.3", dateEnd: "2020.04.13" },
            { id: 3, text: "Element 2.4", dateEnd: "2020.04.14" },
            { id: 4, text: "Element 2.5", dateEnd: "2020.04.17" },
          ],
        },
      ])
    );
  }
};

export default setDefaultBoardIfNoPresent;
