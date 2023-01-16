if exists('g:loaded_kensaku')
  finish
endif
let g:loaded_kensaku = 1

command! -nargs=+ -bar Kensaku call kensaku#_search(<q-args>)

call kensaku#_internal#conf#define(
      \ 'kensaku_dictionary_url',
      \ 'https://github.com/oguna/migemo-compact-dict-latest/releases/download/v0.2/migemo-compact-dict',
      \)
call kensaku#_internal#conf#define(
      \ 'kensaku_dictionary_cache',
      \ expand('~/.cache/kensaku.vim/migemo-compact-dict')
      \)
