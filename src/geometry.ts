import {
  PositionType,
  PositionMapType,
  AreaMapType,
  NodesStatType,
  NodeIdType
} from "./types";

export function findCenterPosition(
  ids: NodeIdType[],
  positions: PositionMapType,
  sizes: AreaMapType
): PositionType {
  // TODO может перенести в tree buildTree ?
  const stat: NodesStatType = ids.reduce(
    (acc, nodeId) => {
      const { y } = positions[nodeId];
      const { height } = sizes[nodeId];

      acc.topEdge = Math.min(acc.topEdge, y);
      acc.bottomEdge = Math.max(acc.bottomEdge, y + height);

      acc.center = acc.topEdge + (acc.bottomEdge - acc.topEdge) / 2;
      // console.log("x", x, y, width, height);

      return acc;
    },
    { topEdge: 0, bottomEdge: 0, center: 0 }
  );

  console.log("state=", stat);
  const centerNode = ids.reduce(
    (acc, nodeId) => {
      const { y } = positions[nodeId];
      const { height } = sizes[nodeId];

      const centerY = y + height / 2;

      console.log(
        "center--",
        Math.abs(centerY - stat.center),
        Math.abs(acc.y - stat.center),
        Math.min(Math.abs(centerY - stat.center), Math.abs(acc.y - stat.center))
      );

      const currentD = Math.abs(centerY - stat.center);
      const prevShortD = Math.abs(acc.y - stat.center);

      if (currentD < prevShortD) {
        acc.y = centerY;
      }

      //acc.y = Math.abs(centerY - stat.center), Math.abs(acc.y  - stat.center));

      return acc;
    },
    { x: 0, y: Infinity }
  );

  console.log("state=", stat, centerNode);

  return centerNode;
}
