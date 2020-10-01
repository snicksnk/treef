import { NodesListType, NodeType } from "./types";

export function sortNodes(data: NodesListType) {
  return data.sort((a: NodeType, b: NodeType) => {
    return a.path.length - b.path.length;
  });
}
