export interface AreaType {
  width: number;
  height: number;
}

export interface PositionType {
  x: number;
  y: number;
}

export interface AreaMapType {
  [key: string]: AreaType;
}

export interface PositionMapType {
  [key: string]: PositionType;
}

export interface NodeType {
  id: NodeIdType;
  width: number;
  height: number;
  pid?: NodeIdType;
  path?: NodeIdType[];
}

export interface NodesStatType {
  topEdge: number;
  bottomEdge: number;
  center: number;
}

export type NodeIdType = string;
export type NodesListType = NodeType[];
