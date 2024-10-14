# Installation

Setup môi trường để code smart contract bằng ngôn ngữ Aiken trên Cardano Protocol

# Aikup

Trước tiên, để có thể tải và sử dụng Aiken CLI, mọi người cần cài đặt `aikup`. Đây là một công cụ giúp quản lý các phiên bản của Aiken CLI một cách thuận tiện, tương tự như `nvm`,...

- **Linux & macOS**: Chạy lệnh sau để cài đặt `aikup`:
    
    ```bash
    curl --proto '=https' --tlsv1.2 -LsSf <https://install.aiken-lang.org> | sh
    
    ```
    
- **Windows**: Khuyến khích sử dụng WSL2 (Windows Subsystem for Linux) để tránh các lỗi không mong muốn. Sau đó, mọi người cài đặt theo hướng dẫn của Linux.
Hoặc mọi người truy cập vào https://github.com/aiken-lang/aikup/releases/tag/v0.0.11 sau đó tải `aikup-x86_64-pc-windows-msvc.msi`

# Language Server

Trong `aiken` CLI đã tích hợp sẵn một `language server`. Nói một cách đơn giản, đây là công cụ hỗ trợ cho các IDE hoặc text editor với các tính năng như `autocomplete`, `go to definition`,...

Để chạy language server protocol, dùng lệnh sau:

```bash
aiken lsp

```

Sau đó, mở IDE mà mọi người đang sử dụng ví dụ như VSCode và bắt đầu code thôi 🧑‍💻

**Lưu ý**: Nếu không hoạt động, mọi người thử đóng và mở lại IDE hoặc khởi chạy lại `language server`.

# Editor Integrations

Mọi người có thể sử dụng extension hỗ trợ `syntax highlighting` và `indentation rules` để tối ưu hoá trải nghiệm khi viết code Aiken trên các IDE hoặc text editor.

[https://github.com/aiken-lang/vscode-aiken](https://github.com/aiken-lang/vscode-aiken)