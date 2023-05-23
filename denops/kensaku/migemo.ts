import type { Denops } from "https://deno.land/x/denops_std@v5.0.0/mod.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.188.0/fs/mod.ts";
import * as u from "https://deno.land/x/unknownutil@v2.1.1/mod.ts";
import * as batch from "https://deno.land/x/denops_std@v5.0.0/batch/mod.ts";
import * as vars from "https://deno.land/x/denops_std@v5.0.0/variable/mod.ts";
import * as jsmigemo from "https://cdn.jsdelivr.net/npm/jsmigemo@0.4.6/dist/jsmigemo.min.mjs";

let migemo: jsmigemo.Migemo | undefined;

async function init(denops: Denops): Promise<jsmigemo.Migemo> {
  const [dictionaryUrl, dictionaryCache] = await batch.collect(
    denops,
    (denops) => [
      vars.g.get(denops, "kensaku_dictionary_url"),
      vars.g.get(denops, "kensaku_dictionary_cache"),
    ],
  );
  u.assertString(dictionaryUrl);
  u.assertString(dictionaryCache);

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

type Rxop =
  | [string, string, string, string, string, string]
  | [string, string, string, string, string, string, string];

type QueryOption = {
  rxop?: Rxop;
};

export function assertQueryOption(x: unknown): asserts x is QueryOption {
  if (
    !(u.isObject(x) &&
      (x.rxop == null ||
        u.isArray(x.rxop, u.isString) &&
          (x.rxop.length === 6 || x.rxop.length === 7)))
  ) {
    throw new Error("Not a QueryOption");
  }
}

const rxopJavaScript = ["|", "(?:", ")", "[", "]", ""];

export async function query(
  denops: Denops,
  value: string,
  option: QueryOption = {},
): Promise<string> {
  const migemo = await getMigemo(denops);
  const rxop = option.rxop || rxopJavaScript;
  const prefix = rxop.length === 7 ? rxop.shift() : "";
  migemo.setRxop(option.rxop || rxopJavaScript);
  return prefix + migemo.query(value);
}

export async function setRomanTable(
  denops: Denops,
  romanTable: [string, string, number?][],
): Promise<void> {
  const migemo = await getMigemo(denops);
  const romanEntries = romanTable.map(([a, b, c]) =>
    new jsmigemo.RomanEntry(a, b, c || 0)
  );
  const rp = new jsmigemo.RomajiProcessor1(romanEntries);
  migemo.setRomajiProcessor(rp);
}
