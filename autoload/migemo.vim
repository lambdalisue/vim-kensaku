function! migemo#query(value) abort
  if denops#plugin#wait('migemo') isnot# 0
    return ''
  endif
  return denops#request('migemo', 'query', [a:value])
endfunction

function! migemo#query_async(value, success, ...) abort
  let l:Failure = a:0 ? a:1 : { e -> s:failure(e) }
  return denops#request_async('migemo', 'query', [a:value], a:success, l:Failure)
endfunction

function! migemo#_search(value) abort
  let l:value = s:prompt(a:value)
  if l:value ==# ''
    return
  endif
  let l:pattern = '\v' .. migemo#query(l:value)
  call s:search(l:pattern)
endfunction

function! migemo#_search_async(value) abort
  let l:value = s:prompt(a:value)
  if l:value ==# ''
    return
  endif
  call migemo#query_async(l:value, { v -> s:search('\v' .. v) })
endfunction

function! s:prompt(value) abort
  return a:value ==# '' ? input(g:migemo#prompt) : a:value
endfunction

function! s:search(value) abort
  let @/ = a:value
  normal! n
endfunction

call migemo#_internal#conf#define(
      \ 'migemo#prompt',
      \ 'MIGEMO: ',
      \)
