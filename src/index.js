import "./styles.css";
import { calcSizes, buildTree } from "./tree";
import { sortNodes } from "./hierarchy";

/*
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
*/

const data = [
  {
    id: "01",
    width: 100,
    height: 50,
    path: []
  },
  {
    id: "02",
    width: 200,
    height: 30,
    pid: "01",
    path: ["01"]
  },

  {
    id: "03",
    width: 200,
    height: 50,
    pid: "01",
    path: ["01"]
  },

  {
    id: "08",
    width: 250,
    height: 50,
    pid: "02",
    path: ["01", "02"]
  },
  {
    id: "09",
    width: 350,
    height: 50,
    pid: "02",
    path: ["01", "02"]
  },
  {
    id: "10",
    width: 350,
    height: 30,
    pid: "02",
    path: ["01", "02"]
  }
];

const flipedNodes = sortNodes(data).reverse();

const nodeSizes = calcSizes(flipedNodes);

const nodesSorted = sortNodes(data);

// console.log('size-', nodeSizes);

const hooks = {
  childrenCentering: (childrenIds, parentNode, nodeSizes, nodesPosition) => {
    const center = nodeSizes[parentNode.id].height / 2 - parentNode.height / 2; //findCenterPosition(childrenIds, nodesPosition, nodeSizes);
    console.log(parentNode, center, nodesPosition, nodeSizes);
    childrenIds.forEach((childrenId) => {
      nodesPosition[childrenId].y = nodesPosition[childrenId].y - center;
    });
    return nodesPosition;
  }
};
const nodesPositions = buildTree(nodesSorted, nodeSizes, hooks);

console.log({ nodeSizes, nodesPositions });

var color = d3.scaleOrdinal([
  "#66c2a5",
  "#fc8d62",
  "#8da0cb",
  "#e78ac3",
  "#a6d854",
  "#ffd92f",
  "#e5c494",
  "#b3b3b3"
]);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight)
  .append("g")
  .attr("transform", "translate(0, 200)");

const nodes = svg.selectAll("rect").data(data);

nodes
  .enter()
  .append("rect")
  .attr("class", "node")
  .style("fill", (d) => color(d.id))
  .attr("id", (d) => `id-${d.id}`)
  .attr("x", (d) => nodesPositions[d.id].x)
  .attr("y", (d) => nodesPositions[d.id].y)
  .attr("width", (d) => d.width)
  .attr("height", (d) => d.height);

const titles = svg.selectAll("text").data(data);

titles
  .enter()
  .append("text")
  .attr("id", (d) => `text-id-${d.id}`)
  .attr("x", (d) => nodesPositions[d.id].x)
  .attr("y", (d) => nodesPositions[d.id].y + 15)
  .style("font-size", "8px")
  .text((d) => `${d.id} ${nodesPositions[d.id].x} ${nodesPositions[d.id].y}`);

const info = d3.select("body").append("div");

const txts = info.selectAll("div").data(data);

txts
  .enter()
  .append("div")
  .style("border", "1px soild black")
  .style("background-color", (d) => color(d.id))
  .text((d) => d.id);
