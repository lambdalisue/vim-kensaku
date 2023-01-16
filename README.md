# 🔍 kensaku.vim

[![Deno 1.28.0 or above](https://img.shields.io/badge/Deno-Support%201.28.0-yellowgreen.svg?logo=deno)](https://github.com/denoland/deno/tree/v1.28.0)
[![Vim 9.0.0472 or above](https://img.shields.io/badge/Vim-Support%209.0.0472-yellowgreen.svg?logo=vim)](https://github.com/vim/vim/tree/v9.0.0472)
[![Neovim 0.8.0 or above](https://img.shields.io/badge/Neovim-Support%200.8.0-yellowgreen.svg?logo=neovim&logoColor=white)](https://github.com/neovim/neovim/tree/v0.8.0)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![vim help](https://img.shields.io/badge/vim-%3Ah%20kensaku-orange.svg)](doc/kensaku.jax)
[![test](https://github.com/lambdalisue/kensaku.vim/actions/workflows/test.yml/badge.svg)](https://github.com/lambdalisue/kensaku.vim/actions/workflows/test.yml)

<div align="center">

![スクリーンキャスト](https://user-images.githubusercontent.com/546312/212752649-d97c3022-f6fc-4153-aac6-2537e3b31697.gif)

</div>

Kensaku (_kensaku.vim_) は Migemo
を利用してローマ字のまま日本語検索を行うプラグインです。 既存の Migemo
プラグインとは異なり JavaScript で実装された [jsmigemo][jsmigemo] を利用するため
[C/Migemo][c/migemo] のインストールは不要です。

[jsmigemo]: https://github.com/oguna/jsmigemo
[c/migemo]: https://www.kaoriya.net/software/cmigemo/

## 必須条件

Kensaku は denops プラグインとして作られているため [Deno](https://deno.land) と
[vim-denops/denops.vim][vim-denops/denops.vim]
がインストールされている必要があります。

- [vim-denops/denops.vim][vim-denops/denops.vim]<br> An ecosystem for writing
  Vim/Neovim plugin in Deno.

[vim-denops/denops.vim]: https://github.com/vim-denops/denops.vim

## インストール

[Deno](https://deno.land) をインストール後
[vim-plug](https://github.com/junegunn/vim-plug)
などを利用して以下の様にインストールします。

```vim
Plug 'vim-denops/denops.vim'
Plug 'lambdalisue/kensaku.vim'
```

## 利用方法

`:Kensaku`
コマンドにクエリをローマ字として渡すと、バッファ内の日本語を検索できます。

```
:Kensaku kensaku
```

検索結果をハイライトしたい場合は以下の様に `| set hlsearch` を加えます。

```
:Kensaku kensaku | set hlsearch
```

### 検索クエリにローマ字が存在する場合に自動適用する

`/` や `?` による検索の際に自動的に日本語検索を有効にしたい場合は、以下の様に
`<CR>` のマッピングを定義してください。

```vim
cnoremap <CR> <Plug>(kensaku-auto-replace)<CR>
```

これにより検索クエリにローマ字が存在する場合は自動的に対応する正規表現に置き換わった状態で検索されます。

なお、この機能は
[rhysd/migemo-search.vim](https://github.com/rhysd/migemo-search.vim)
で実装されていたものを少しアレンジしたものです。

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
      \ { v -> Search(v) },
      \)
```

## 参考情報

- [Migemo: ローマ字のまま日本語をインクリメンタル検索](http://0xcc.net/migemo/)
- [辞書構造を工夫した Migemo 実装の紹介](https://qiita.com/oguna/items/c70e8c409b663d74113e)
- [Vim で migemo を使って日本語でもローマ字のまま検索がしたい](http://haya14busa.com/vim_migemo_search/)

## 競合プラグイン

- [haya14busa/vim-migemo](https://github.com/haya14busa/vim-migemo)
- [rhysd/migemo-search.vim](https://github.com/rhysd/migemo-search.vim)

## License

The code in this repository follows MIT license, texted in [LICENSE](./LICENSE).
Contributors need to agree that any modifications sent in this repository follow
the license.
