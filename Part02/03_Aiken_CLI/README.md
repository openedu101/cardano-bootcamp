# Aiken CLI

```bash
aiken --help
```

```bash
Cardano smart contract language and toolchain

Usage: aiken <COMMAND>

Commands:
  new         Create a new Aiken project
  fmt         Format an Aiken project
  export      Export a function as a standalone UPLC program.
              Arguments to the function can be applied using
              `aiken apply`
  build       Build an Aiken project [aliases: b]
  address     Compute a validator's address
  check       Type-check an Aiken project [aliases: c]
  docs        Build the documentation for an Aiken project
  add         Add a new project package as dependency
  blueprint   Commands for working with Plutus blueprints
  packages    Managing project dependencies
  tx          Commands for working with transactions
  uplc        Commands for working with untyped Plutus-core
  completion  Commands for working with transactions
  help        Print this message or the help of the given
              subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

# 1. Khởi tạo Aiken project

Để tạo mới một Aiken project, mọi người cần chạy lệnh sau:

```bash
aiken new {OWNER}:{PROJECT}
```

Trong đó:

- **Owner**: Tên người phát triển dự án
- **Project**: Tên dự án

Mình sẽ không đi sâu vào cấu trúc của một Aiken project trong bài này, mà sẽ nói chi tiết ở bài kế tiếp.

# 2. Kiểm tra và chạy unit test

Để kiểm tra cú pháp và chạy các unit test trong dự án, mọi người sử dụng lệnh:

```bash
aiken check
```

Lệnh này sẽ giúp kiểm tra lỗi cú pháp và đảm bảo rằng tất cả các file mã nguồn đều hoạt động đúng.

# 3. Build project

Sau khi check không có lỗi gì hết thì bước tiếp theo là build project để có thể deploy lên Cardano Protocol

```bash
aiken build
```

Sau khi build thành công, sẽ xuất hiện:

- **`build`** folder
- **`plutus.json`**: file JSON để deploy lên Cardano Blockchain