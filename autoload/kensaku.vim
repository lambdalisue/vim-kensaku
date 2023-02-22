function! kensaku#query(value, ...) abort
  if denops#plugin#wait('kensaku') isnot# 0
    return ''
  endif
  let l:option = extend({
        \ 'rxop': g:kensaku#rxop#vim,
        \}, a:0 ? a:1 : {},
        \)
  return denops#request('kensaku', 'query', [a:value, l:option])
endfunction

function! kensaku#query_async(value, success, ...) abort
  let l:option = a:0 ? a:1 : {}
  let l:option.rxop = get(l:option, 'rxop', g:kensaku#rxop#vim)
  let l:Failure = get(l:option, 'failure', funcref('s:failure'))
  return denops#request_async(
        \ 'kensaku',
        \ 'query',
        \ [a:value, l:option],
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
