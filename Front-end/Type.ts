import { BinaryOp, IfStmt, NotOp, Sensor, Threshold } from "./utils/AST";

interface NavItemType {
  itemName: string;
  itemLink: string;
  navId: string;
  imgLink: string;
}

interface FilterType {
  sensors?: string[],
  devices?: string[],
  rooms?: string[],
  searchKey?: string,
  dateFrom?: Date | undefined,
  dateTo?: Date | undefined
}

interface SensorInfoType {
  name: string,
  type: string, 
  value: string
}

interface DeviceInfoType {
  name: string,
  type: string, 
}

type cmpType = "Time" | "Sensor" | "Choosing"

type AstType = IfStmt | BinaryOp | NotOp | Sensor | Threshold

interface JsonParseType {
  actionName: string ,
  condition: BinaryJsonParseType | NotJsonParseType,
  actionList: DeviceJsonParseType[] 
}

interface BinaryJsonParseType {
  operator: string,
  lhs: BinaryJsonParseType | NotJsonParseType | SensorInfoType | "time",
  rhs: BinaryJsonParseType | NotJsonParseType | string
}

interface NotJsonParseType {
  operator: "not",
  operand: BinaryJsonParseType | NotJsonParseType
}

interface DeviceJsonParseType {
  deviceName: string,
  deviceType: string,
  deviceLocation: string,
  state: number
}

export type { NavItemType, FilterType, SensorInfoType, cmpType, AstType, DeviceInfoType, JsonParseType, BinaryJsonParseType, NotJsonParseType, DeviceJsonParseType}