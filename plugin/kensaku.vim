if exists('g:loaded_kensaku')
  finish
endif
let g:loaded_kensaku = 1

function! s:define(name, default) abort
  let g:{a:name} = get(g:, a:name, a:default)
endfunction
call s:define(
      \ 'kensaku_dictionary_url',
      \ 'https://github.com/oguna/migemo-compact-dict-latest/releases/download/v0.2/migemo-compact-dict',
      \)
call s:define(
      \ 'kensaku_dictionary_cache',
      \ expand('~/.cache/kensaku.vim/migemo-compact-dict')
      \)

" XXX
" Remove this warning message after v3.0.0
if !exists('g:kensaku_disable_v3_migration_warning')
  echohl WarningMsg
  echomsg '[kensaku] BREAKING CHANGES:'
  echomsg '[kensaku] Kensaku v3 returns Vim script regex from `kensaku#query()` function so users no longer need to prepend `\v` (very magic).'
  echomsg '[kensaku] Additionally, Optional arguments of `kensaku#query_async()` has slightly changed. See help for more detail.'
  echomsg '[kensaku] Disable this message by `let g:kensaku_disable_v3_migration_warning = 1` or wait until the next release.'
  echohl None
endif
