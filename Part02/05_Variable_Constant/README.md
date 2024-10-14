# Variable & Constant

# Let

Để khai báo biến trong Aiken, sử dụng keyword `let`:

```rust
let x = 2

```

Biến sẽ không thể thay đổi giá trị ban đầu (immutable). Tuy nhiên, khi thực hiện gán lại, ta có thể "shadow" hoặc hiểu là ghi đè giá trị trước đó:

```rust
test temp() {
    let x = 1
    let y = x
    let x = 2

    y + x == 3
}

```

# Module constants

Không thể khai báo biến bằng từ khóa `let` ở cấp độ top-level (nghĩa là bên ngoài các hàm).

Chỉ có các keyword và pattern sau được phép khai báo ở top-level:

```rust
→ validator
→ fn
→ opaque
→ <END OF FILE>
→ const
→ use
→ test
→ type
→ pub

```

```rust
const start_year = 2101
const end_year = 2111
```

Được tính tại compile time

# Type annotation

Có thể gán kiểu dữ liệu cho biến. Nếu không chỉ định rõ, Aiken sẽ tự động suy luận kiểu dựa trên giá trị gán cho biến:

```rust
const name: ByteArray = "Aiken"
const size: Int = 100

let result: Bool = 14 > 42
```