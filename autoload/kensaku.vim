function! kensaku#query(value) abort
  if denops#plugin#wait('kensaku') isnot# 0
    return ''
  endif
  return denops#request('kensaku', 'query', [a:value])
endfunction

function! kensaku#query_async(value, success, ...) abort
  let l:Failure = a:0 ? a:1 : { e -> s:failure(e) }
  return denops#request_async('kensaku', 'query', [a:value], a:success, l:Failure)
endfunction

function! kensaku#_search(value) abort
  call s:search(kensaku#query(a:value))
endfunction

function! kensaku#_search_async(value) abort
  call kensaku#query_async(a:value, funcref('s:search'))
endfunction

function! s:search(value) abort
  if a:value ==# ''
    return
  endif
  let @/ = '\v' .. a:value
  normal! n
endfunction

function! s:failure(err) abort
  echohl ErrorMsg
  echomsg printf('[kensaku] %s', a:err)
  echohl None
endfunction
