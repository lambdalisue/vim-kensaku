function! kensaku#query(value) abort
  if denops#plugin#wait('kensaku') isnot# 0
    return ''
  endif
  return denops#request('kensaku', 'query', [a:value])
endfunction

function! kensaku#query_async(value, success, ...) abort
  let l:Failure = a:0 ? a:1 : funcref('s:failure')
  return denops#request_async(
        \ 'kensaku',
        \ 'query',
        \ [a:value],
        \ { v -> a:success(v) },
        \ { e -> l:Failure(e) },
        \)
endfunction

function! kensaku#set_roman_table(romanTable) abort
  call denops#plugin#wait_async('kensaku', {
        \ -> denops#notify('kensaku', 'setRomanTable', [a:romanTable]) })
endfunction

function! s:failure(err) abort
  echoerr a:err
endfunction
