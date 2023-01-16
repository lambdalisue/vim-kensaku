import type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
import * as path from "https://deno.land/std@0.172.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.172.0/fs/mod.ts";
import * as unknownutil from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
import * as batch from "https://deno.land/x/denops_std@v4.0.0/batch/mod.ts";
import * as vars from "https://deno.land/x/denops_std@v4.0.0/variable/mod.ts";
import * as jsmigemo from "https://cdn.jsdelivr.net/npm/jsmigemo@0.4.3/dist/jsmigemo.min.mjs";

let migemo: jsmigemo.Migemo | undefined;

async function init(denops: Denops): Promise<jsmigemo.Migemo> {
  const [dictionaryUrl, dictionaryCache] = await batch.gather(
    denops,
    async (denops) => {
      await vars.g.get(denops, "kensaku_dictionary_url");
      await vars.g.get(denops, "kensaku_dictionary_cache");
    },
  );
  unknownutil.assertString(dictionaryUrl);
  unknownutil.assertString(dictionaryCache);

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

export async function query(denops: Denops, value: string): Promise<string> {
  if (!migemo) {
    migemo = await init(denops);
  }
  return migemo.query(value);
}
