# 🔍 kensaku.vim

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Migemo を利用してローマ字による日本語検索機能を提供するプラグインです。 他の
Migemo プラグインと異なり JavaScript
実装を利用しているため、プラグインのインストールのみで動作します。

Kensaku (_kensaku.vim_) は Migemo を利用してローマ字のまま日本語検索を行うプラ
グインです。既存の Migemo プラグインとは異なり JavaScript で実装された
[jsmigemo][jsmigemo] を利用するため [C/Migemo][C/Migemo]
のインストールは不要です。

[jsmigemo]: https://github.com/oguna/jsmigemo
[C/Migemo]: https://www.kaoriya.net/software/cmigemo/

## 利用方法

`:Kensaku`
コマンドにクエリをローマ字として渡すと、バッファ内の日本語を検索できます。

```
:Kensaku kensaku
```

## 別プラグインからの利用

### TypeScript からの利用 (denops)

[`denops.dispatch()`](https://deno.land/x/denops_std@v4.0.0/mod.ts?s=Denops#method_dispatch_5)
を利用して `query` 関数を呼び出します。

```
const pattern = await denops.dispatch("kensaku", "query", "kensaku");
```

### Vim script からの利用

`kensaku#query()` を以下のように呼び出します。戻り値は JavaScript
の正規表現なので、利用する場合は `\v` を前置する必要があります。

```vim
function! Search(value) abort
  let @/ = '\v' .. a:value
  normal! n
endfunction

call Search(kensaku#query('kensaku'))
```

上記は処理を同期的に待つので、非同期が必要な場合は代わりに
`kensaku#query_async()` を利用します。

```vim
function! Search(value) abort
  let @/ = '\v' .. a:value
  normal! n
endfunction

call kensaku#query_async(
      \ 'kensaku',
      \ { v -> Search('/\v' .. v) },
      \)
```

## 参考

- [Migemo: ローマ字のまま日本語をインクリメンタル検索](http://0xcc.net/migemo/)
- [辞書構造を工夫した Migemo 実装の紹介](https://qiita.com/oguna/items/c70e8c409b663d74113e)
- [Vim で migemo を使って日本語でもローマ字のまま検索がしたい](http://haya14busa.com/vim_migemo_search/)

## License

The code in this repository follows MIT license, texted in [LICENSE](./LICENSE).
Contributors need to agree that any modifications sent in this repository follow
the license.
