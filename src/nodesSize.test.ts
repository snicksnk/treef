import { calcSizes, buildTree } from "./tree.ts";
import { sortNodes } from "./hierarchy";

const basicTree = [
  {
    id: 1,
    width: 10,
    height: 50,
    path: []
  },
  {
    id: 2,
    width: 20,
    height: 50,
    pid: 1,
    path: [1]
  },
  {
    id: 3,
    width: 20,
    height: 50,
    pid: 1,
    path: [1]
  },
  {
    id: 4,
    width: 20,
    height: 50,
    pid: 3,
    path: [1, 3]
  },
  {
    id: 5,
    width: 20,
    height: 50,
    pid: 3,
    path: [1, 3]
  }
];

it("basic hierarhy height and width", () => {
  expect(calcSizes(sortNodes(basicTree).reverse())).toMatchObject({
    1: {
      height: 150,
      width: 40
    },
    2: {
      height: 0,
      width: 0
    },
    3: {
      height: 100,
      width: 20
    },
    4: {
      height: 0,
      width: 0
    }
  });
});

it("Node bug size", () => {
  const data = [
    {
      id: 1,
      width: 10,
      height: 50,
      path: []
    },
    {
      id: 2,
      width: 20,
      height: 30,
      pid: 1,
      path: [1]
    },
    {
      id: 3,
      width: 20,
      height: 50,
      pid: 1,
      path: [1]
    },
    {
      id: 8,
      width: 50,
      height: 50,
      pid: 2,
      path: [1, 2]
    }
  ];

  expect(calcSizes(sortNodes(basicTree).reverse())).toMatchObject({
    1: {
      height: 150,
      width: 40
    },
    2: {
      height: 0,
      width: 0
    },
    3: {
      height: 100,
      width: 20
    },
    4: {
      height: 0,
      width: 0
    }
  });
});

it("nodes positions", () => {
  const nodeSizes = calcSizes(sortNodes(basicTree).reverse());
  const nodes = sortNodes(basicTree);

  expect(buildTree(nodes, nodeSizes)).toMatchObject({
    1: {
      x: 0,
      y: 0
    },
    2: {
      x: 10,
      y: 0
    },
    3: {
      x: 10,
      y: 50
    },
    4: {
      x: 30,
      y: 50
    },
    5: {
      x: 30,
      y: 100
    }
  });
});

it("node position bug", () => {
  const treeWIthBug = [
    {
      id: 1,
      width: 10,
      height: 50,
      path: []
    },
    {
      id: 2,
      width: 20,
      height: 30,
      pid: 1,
      path: [1]
    },

    {
      id: 3,
      width: 20,
      height: 50,
      pid: 1,
      path: [1]
    },

    {
      id: 8,
      width: 50,
      height: 50,
      pid: 2,
      path: [1, 2]
    }
  ];

  const nodeSizes = calcSizes(sortNodes(treeWIthBug).reverse());
  const nodes = sortNodes(treeWIthBug);

  expect(buildTree(nodes, nodeSizes)).toMatchObject({
    1: {
      x: 0,
      y: 0
    },
    2: {
      x: 10,
      y: 0
    },
    3: {
      x: 10,
      y: 50
    },
    8: {
      x: 30,
      y: 0
    }
  });
});
