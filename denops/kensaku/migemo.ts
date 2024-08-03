import type { Denops } from "jsr:@denops/std@^7.0.0";
import {
  assert,
  isRecord,
  isString,
  isUndefined,
} from "jsr:@core/unknownutil@^3.18.1";
import * as path from "jsr:@std/path@^1.0.2";
import * as fs from "jsr:@std/fs@^1.0.0";
import * as batch from "jsr:@denops/std@^7.0.0/batch";
import * as vars from "jsr:@denops/std@^7.0.0/variable";
import * as jsmigemo from "npm:jsmigemo@^0.4.8";
import { decompose, isKensakuRxop, KensakuRxop } from "./rxop.ts";

let migemo: jsmigemo.Migemo | undefined;

const defaultRxop = {
  or: "|",
  startGroup: "(?:",
  endGroup: ")",
  startClass: "[",
  endClass: "]",
  newline: "",
  escape: "\\.[]{}()*+-?^$|",
};

async function init(denops: Denops): Promise<jsmigemo.Migemo> {
  const [dictionaryUrl, dictionaryCache] = await batch.collect(
    denops,
    (denops) => [
      vars.g.get(denops, "kensaku_dictionary_url"),
      vars.g.get(denops, "kensaku_dictionary_cache"),
    ],
  );
  assert(dictionaryUrl, isString);
  assert(dictionaryCache, isString);

  const data = await readOrFetch(dictionaryUrl, dictionaryCache);
  const dict = new jsmigemo.CompactDictionary(data.buffer);
  const m = new jsmigemo.Migemo();
  m.setDict(dict);
  return m;
}

async function readOrFetch(url: string, cache: string): Promise<Uint8Array> {
  try {
    return await Deno.readFile(cache);
  } catch (e: unknown) {
    if (e instanceof Deno.errors.NotFound) {
      console.debug("No cache file exists. Download...");
      await fs.ensureDir(path.dirname(cache));
      const resp = await fetch(url);
      const file = await Deno.open(cache, { write: true, create: true });
      await resp.body!.pipeTo(file.writable);
      return await Deno.readFile(cache);
    }
    throw e;
  }
}

async function getMigemo(denops: Denops): Promise<jsmigemo.Migemo> {
  if (!migemo) {
    migemo = await init(denops);
  }
  return migemo;
}

export type QueryOption = {
  rxop?: KensakuRxop;
};

export function assertQueryOption(x: unknown): asserts x is QueryOption {
  if (!isRecord(x) || (!isUndefined(x.rxop) && !isKensakuRxop(x.rxop))) {
    throw new Error("Not a QueryOption");
  }
}

export async function query(
  denops: Denops,
  value: string,
  option: QueryOption = {},
): Promise<string> {
  const migemo = await getMigemo(denops);
  const [prefix, rxop] = decompose(option.rxop || defaultRxop);
  migemo.setRxop(rxop);
  return prefix + migemo.query(value);
}

export async function setRomanTable(
  denops: Denops,
  romanTable: [roman: string, hiragana: string, remain?: number][],
): Promise<void> {
  const migemo = await getMigemo(denops);
  const romanEntries = romanTable.map(([a, b, c]) =>
    new jsmigemo.RomanEntry(a, b, c || 0)
  );
  const rp = new jsmigemo.RomajiProcessor1(romanEntries);
  migemo.setRomajiProcessor(rp);
}
