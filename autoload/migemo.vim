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
