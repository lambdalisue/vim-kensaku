import type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
import * as unknownutil from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
import { query } from "./migemo.ts";

export function main(denops: Denops): void {
  denops.dispatcher = {
    query(value: unknown) {
      unknownutil.assertString(value);
      return query(denops, value);
    },
  };
}
