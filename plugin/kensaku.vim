if exists('g:loaded_kensaku')
  finish
endif
let g:loaded_kensaku = 1

command! -nargs=+ -bar Kensaku call kensaku#_search#search(<q-args>)

cnoremap <silent><expr> <Plug>(kensaku-auto-replace) kensaku#_auto_replace#replace()

call kensaku#_conf#define(
      \ 'kensaku_dictionary_url',
      \ 'https://github.com/oguna/migemo-compact-dict-latest/releases/download/v0.2/migemo-compact-dict',
      \)
call kensaku#_conf#define(
      \ 'kensaku_dictionary_cache',
      \ expand('~/.cache/kensaku.vim/migemo-compact-dict')
      \)
