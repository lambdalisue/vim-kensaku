import type { Denops } from "jsr:@denops/std@^7.0.0";
import { assert, is } from "jsr:@core/unknownutil@^3.18.1";
import { assertQueryOption, query, setRomanTable } from "./migemo.ts";

export function main(denops: Denops): void {
  denops.dispatcher = {
    /**
     * Migemo を利用して `value` (string) を検索するための正規表現 (string) を返します
     *
     * 必要になる辞書などは自動的にダウンロード・キャッシュします。
     */
    query(value: unknown, option: unknown = {}) {
      assert(value, is.String);
      assertQueryOption(option);
      return query(denops, value, option);
    },
    setRomanTable(romanTable: unknown) {
      assert(romanTable, isRomanTable);
      return setRomanTable(denops, romanTable);
    },
  };
}

const isRomanTable = is.ArrayOf<
  [roman: string, hiragana: string, remain?: number]
>(is.ParametersOf([is.String, is.String, is.OptionalOf(is.Number)] as const));
