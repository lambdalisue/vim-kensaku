if exists('g:loaded_migemo')
  finish
endif
let g:loaded_migemo = 1

function! s:define(name, default) abort
  let g:{a:name} = get(g:, a:name, a:default)
endfunction

call s:define(
      \ 'migemo_dictionary_url',
      \ 'https://github.com/oguna/migemo-compact-dict-latest/releases/download/v0.2/migemo-compact-dict',
      \)
call s:define(
      \ 'migemo_dictionary_cache',
      \ expand('~/.cache/migemo.vim/migemo-compact-dict')
      \)
