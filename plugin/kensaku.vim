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
