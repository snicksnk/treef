import { sortNodes } from "./hierarchy";
import { NodesListType } from "./types";

describe("Hierarhy test", () => {
  it("Sort nodes", () => {
    const nodes: NodesListType = [
      {
        id: "02",
        pid: "01",
        width: 100,
        height: 100,
        path: ["01"]
      },
      {
        id: "01",
        width: 100,
        height: 100,
        path: []
      },
      {
        id: "03",
        pid: "01",
        width: 100,
        height: 100,
        path: ["01"]
      },
      {
        id: "04",
        pid: "02",
        width: 100,
        height: 100,
        path: ["01", "02"]
      },
      {
        id: "05",
        pid: "03",
        width: 100,
        height: 100,
        path: ["01", "02", "03"]
      }
    ];

    expect(sortNodes(nodes).map((n) => n.id)).toMatchObject([
      "01",
      "02",
      "03",
      "04",
      "05"
    ]);
  });
});
