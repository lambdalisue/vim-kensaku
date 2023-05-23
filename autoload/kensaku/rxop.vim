let g:kensaku#rxop#vim = #{
      \ prefix: '\m', 
      \ or: '\|', 
      \ startGroup: '\%(',
      \ endGroup: '\)',
      \ startClass: '[',
      \ endClass: ']',
      \ newline: '',
      \ escape: '\\.[]*^$',
      \}
let g:kensaku#rxop#javascript = #{
      \ or: '|',
      \ startGroup: '(?:',
      \ endGroup: ')',
      \ startClass: '[',
      \ endClass: ']',
      \ newline: '',
      \ escape: '\\.[]{}()*+-?^$|',
      \}
