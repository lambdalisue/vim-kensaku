function! kensaku#_auto_replace#replace() abort
  let l:cmdtype = getcmdtype()
  if l:cmdtype ==# '/' || l:cmdtype ==# '?'
    let l:cmdline = getcmdline()
    if l:cmdline =~# g:kensaku#_auto_replace#pattern
      let l:extracted = matchstr(l:cmdline, g:kensaku#_auto_replace#pattern)
      return "\<C-u>\\v" .. kensaku#query(l:extracted)
    endif
  endif
  return ''
endfunction

" https://github.com/rhysd/migemo-search.vim/blob/25fc2f029eb24d1178ee34ceaefa23da17f70c7e/plugin/migemosearch.vim#L12-L19
call kensaku#_conf#define(
      \ 'kensaku#_auto_replace#pattern',
      \ '^\%(\\\a\)\=\zs\(\(\(\([bdfghjklmnpstrzwx]\)\4\=\)\=y\=\([ei]\|[aou]h\=\)\)\|\%(ss\=\|dd\=\)\=h[aiuo]\|cc\=h[aio]\|tt\=su\|n\|-\)\+$'
      \)
