import { findCenterPosition } from "./geometry";
import { PositionMapType, AreaMapType } from "./types";

describe("Find center node", () => {
  it("Find center", () => {
    const nodesSizes: AreaMapType = {
      "001": {
        width: 100,
        height: 100
      },
      "002": {
        width: 100,
        height: 100
      },
      "003": {
        width: 100,
        height: 100
      },
      // Ignored
      "004": {
        width: 1000,
        height: 1000
      }
    };

    const nodesPositions: PositionMapType = {
      "001": {
        x: 10,
        y: 0
      },
      "002": {
        x: 10,
        y: 100
      },
      "003": {
        x: 10,
        y: 200
      },
      // Ignored
      "004": {
        x: 1000,
        y: 1000
      }
    };

    const ids = ["001", "002", "003"];
    expect(findCenterPosition(ids, nodesPositions, nodesSizes)).toMatchObject({
      x: 0,
      y: 150
    });
  });

  it("Find center with offset", () => {
    const nodesSizes: AreaMapType = {
      "001": {
        width: 100,
        height: 100
      },
      "002": {
        width: 100,
        height: 120
      }
    };

    const nodesPositions: PositionMapType = {
      "001": {
        x: 10,
        y: 50
      },
      "002": {
        x: 10,
        y: 150
      }
    };

    const ids = ["001", "002"];
    expect(findCenterPosition(ids, nodesPositions, nodesSizes)).toMatchObject({
      x: 0,
      y: 100
    });
  });
});
