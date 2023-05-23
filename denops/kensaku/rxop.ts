import {
  isArray,
  isObject,
  isString,
  isUndefined,
} from "https://deno.land/x/unknownutil@v2.1.1/mod.ts";

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
  if (isArray(x, isString)) {
    return x.length === 6 || x.length === 7;
  } else if (isObject(x)) {
    return (
      (isUndefined(x.prefix) || isString(x.prefix)) &&
      isString(x.or) &&
      isString(x.startGroup) &&
      isString(x.endGroup) &&
      isString(x.startClass) &&
      isString(x.endClass) &&
      isString(x.newline) &&
      isString(x.escape)
    );
  }
  return false;
}

export function decompose(rxop: KensakuRxop): [string, Rxop] {
  if (isArray(rxop)) {
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
