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
