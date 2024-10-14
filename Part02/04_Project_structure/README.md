# Aiken Project Structure

```bash
├── .github
├── README.md
├── aiken.toml
├── env
├── lib
└── validators
```

`.github`: Thư mục chứa các workflow CI/CD, tự động kích hoạt mỗi khi có thay đổi trên nhánh `main` hoặc khi có Pull Request. Mục tiêu là kiểm tra định dạng, phát hiện lỗi, và build dự án để đảm bảo chất lượng code luôn đạt chuẩn.

`lib`: bao gồm các module tự định nghĩa, dùng để hỗ trợ cho việc xây dựng validator. Nếu project chủ yếu là thư viện cho các project khác sử dụng thì đây sẽ là fodler làm việc chính. 

`validators`: Chứa mã nguồn của smart contract, thường có file trùng tên với tên dự án, đại diện cho logic của smart contract.

`env`: Nơi lưu trữ các file cấu hình cho từng môi trường như preprod, preview, và production.

`aiken.toml`: Tương tự như `Cargo.toml` trong Rust, file này chứa thông tin metadata của dự án và danh sách các dependencies (thư viện).

```toml
# Tên dự án có định dạng {organisation}/{repository}
name = "tung-lee/temp"

# Phiên bản của dự án
version = "0.0.0"

# Aiken version (được tạo tự động)
compiler = "v1.1.3"

# Phiên bản Plutus => khi biên dịch ra phải đúng phiên bản này
plutus = "v3"

license = "Apache-2.0"

# Mô tả ngắn gọn về dự án
description = "Aiken contracts for project 'tung-lee/temp'"

# Thông tin của dự án để hiển thị trong document được tạo ra từ aiken docs
[repository]
user = "tung-lee"
project = "temp"
platform = "github"

# Danh sách các dependencies -> Sử dụng command aiken packages để quản lý
[[dependencies]]
name = "aiken-lang/stdlib"
version = "v2.1.0" # có thể là git tag, branch name hay git commit hash
source = "github"

[config]

```