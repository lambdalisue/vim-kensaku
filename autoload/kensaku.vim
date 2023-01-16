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

function! s:search(value) abort
  if a:value ==# ''
    return
  endif
  let @/ = '\v' .. a:value
  let v:errmsg = ''
  silent! normal! n
  if v:errmsg !=# ''
    echohl ErrorMsg
    echo v:errmsg
    echohl None
  endif
endfunction
