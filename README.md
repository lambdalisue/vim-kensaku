# 🔍 migemo.vim

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**UNDER DEVELOPMENT**

## Usage

Call `migemo#query()` function synchronously with query like

```
echo migemo#query('kensaku')
```

Or call `migemo#query_async()` function asynchronously with query like

```
call migemo#query_async('kensaku', { v -> execute('echomsg v', '') })
```

## License

The code in this repository follows MIT license, texted in [LICENSE](./LICENSE).
Contributors need to agree that any modifications sent in this repository follow
the license.
