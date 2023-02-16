import type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
import * as unknownutil from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
import { query, setRomanTable } from "./migemo.ts";

export function main(denops: Denops): void {
  denops.dispatcher = {
    /**
     * Migemo を利用して `value` (string) を検索するための正規表現 (string) を返します
     *
     * 必要になる辞書などは自動的にダウンロード・キャッシュします。
     */
    query(value: unknown) {
      unknownutil.assertString(value);
      return query(denops, value);
    },
    setRomanTable(romanTable: unknown) {
      unknownutil.assertArray<[string, string, number?]>(romanTable);
      return setRomanTable(denops, romanTable);
    },
  };
}
