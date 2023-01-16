if exists('g:loaded_migemo')
  finish
endif
let g:loaded_migemo = 1

command! -nargs=* -bar Migemo call migemo#_search(<q-args>)
command! -nargs=* MigemoAsync call migemo#_search_async(<q-args>)

call migemo#_internal#conf#define(
      \ 'migemo_dictionary_url',
      \ 'https://github.com/oguna/migemo-compact-dict-latest/releases/download/v0.2/migemo-compact-dict',
      \)
call migemo#_internal#conf#define(
      \ 'migemo_dictionary_cache',
      \ expand('~/.cache/migemo.vim/migemo-compact-dict')
      \)
