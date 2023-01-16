function! kensaku#_search#search(value) abort
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

