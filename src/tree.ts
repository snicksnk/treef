import {
  AreaType,
  AreaMapType,
  NodesListType,
  NodeType,
  PositionMapType
} from "./types";

import { findCenterPosition } from "./geometry";

export function addNode(nodesList: NodesListType, newNode: NodeType) {
  const parentNode = nodesList.find((node) => node.id === newNode.pid);
  const node = {
    ...newNode,
    path: [...parentNode.path, parentNode.id]
  };
  return [...nodesList, node];
}

export function calcSizes(flipedNodes: NodesListType): AreaMapType {
  const nodesChildrenSizes = flipedNodes.reduce(
    (nodeSizes: AreaMapType, parentNode: NodeType) => {
      const childrens = flipedNodes.filter(
        (node) => node.pid === parentNode.id
      );

      const childrenSize = childrens.reduce(
        (childrenSize: AreaType, children: NodeType) => {
          const childrensOfChidlrenSize = nodeSizes[children.id] || {
            width: 0,
            height: 0
          };

          const childrenHeight = Math.max(
            childrensOfChidlrenSize.height,
            children.height
          );

          const childrenWithChildrensWidth =
            children.width + childrensOfChidlrenSize.width;

          const childrensWidth = Math.max(
            childrenSize.width,
            childrenWithChildrensWidth
          );

          const height = childrenSize.height + childrenHeight;
          const width = childrensWidth;

          return { height, width };
        },
        { height: 0, width: 0 }
      );

      nodeSizes[parentNode.id] = childrenSize;
      return nodeSizes;
    },
    {}
  );

  return nodesChildrenSizes;
}

export function buildTree(
  nodes: NodesListType,
  nodeSizes: AreaMapType
  /*hooks: {
    centuring: () => PositionMapType
  }*/
): PositionMapType {
  const rootNode = nodes[0];

  const nodesPositions = nodes.reduce(
    (nodesPosition: PositionMapType, parentNode: NodeType) => {
      const parentNodeCoords = nodesPosition[parentNode.id] || { x: 0, y: 0 };
      const parentNodeSize = nodeSizes[parentNode.id];

      const childrens = nodes
        .filter((node) => node.pid === parentNode.id)
        // HACK
        .sort((a, b) => `${a.id}`.localeCompare(`${b.id}`));

      let nodePositionCursor = {
        x: parentNodeCoords.x + parentNodeSize.width,
        y: parentNodeCoords.y
      };

      childrens.forEach((children) => {
        // console.log("nodePositionCursor--", children, nodePositionCursor);
        const childrenPosition = {
          x: parentNodeCoords.x + parentNode.width,
          y: nodePositionCursor.y
        };

        nodesPosition[children.id] = childrenPosition;

        const yCursor = Math.max(
          children.height,
          nodeSizes[children.id].height
        );
        nodePositionCursor = {
          x: childrenPosition.x,
          y: childrenPosition.y + yCursor
        };
      });

      // const center = findCenterPosition(childrenIds, nodesPosition, nodeSizes);

      // onst positions = Object.keys(nodesPosition).filter(keys )

      // findCenterPosition()

      /*
      nodesPosition[parentNode.id] = {
        ...nodesPosition[parentNode.id],
        y:  nodePositionCursor.y
      }
      */

      return { ...nodesPosition };
    },
    { [rootNode.id]: { x: 0, y: 0 } }
  );

  return nodesPositions;
}
