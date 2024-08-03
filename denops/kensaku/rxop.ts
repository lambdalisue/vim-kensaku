import { is } from "jsr:@core/unknownutil@^4.0.0";

// https://github.com/oguna/jsmigemo/blob/d33052525dcb4bacdddc1e0b1f39a3675831ec92/src/TernaryRegexGenerator.ts#L127
const defaultEscape = "\\.[]{}()*+-?^$|";

export type Rxop = [
  or: string,
  startGroup: string,
  endGroup: string,
  startClass: string,
  endClass: string,
  newline: string,
  escape: string,
];

export type KensakuRxop =
  | [
    or: string,
    startGroup: string,
    endGroup: string,
    startClass: string,
    endClass: string,
    newline: string,
  ]
  | [
    prefix: string,
    or: string,
    startGroup: string,
    endGroup: string,
    startClass: string,
    endClass: string,
    newline: string,
  ]
  | {
    prefix?: string;
    or: string;
    startGroup: string;
    endGroup: string;
    startClass: string;
    endClass: string;
    newline: string;
    escape: string;
  };

export function isKensakuRxop(x: unknown): x is KensakuRxop {
  if (is.ArrayOf(is.String)(x)) {
    return x.length === 6 || x.length === 7;
  } else if (is.Record(x)) {
    return (
      (is.Undefined(x.prefix) || is.String(x.prefix)) &&
      is.String(x.or) &&
      is.String(x.startGroup) &&
      is.String(x.endGroup) &&
      is.String(x.startClass) &&
      is.String(x.endClass) &&
      is.String(x.newline) &&
      is.String(x.escape)
    );
  }
  return false;
}

export function decompose(rxop: KensakuRxop): [string, Rxop] {
  if (is.Array(rxop)) {
    if (rxop.length === 6) {
      return ["", [...rxop, defaultEscape]];
    } else {
      const [prefix, ...rest] = rxop;
      return [prefix, [...rest, defaultEscape]];
    }
  } else {
    return [rxop.prefix || "", [
      rxop.or,
      rxop.startGroup,
      rxop.endGroup,
      rxop.startClass,
      rxop.endClass,
      rxop.newline,
      rxop.escape,
    ]];
  }
}
