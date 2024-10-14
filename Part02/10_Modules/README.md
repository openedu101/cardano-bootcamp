# Modules

Aiken program được xây dựng từ các module - bao gồm các hàm và kiểu dữ liệu. Mỗi module có namespace riêng (ví dụ module `string` có namespace `aiken/primitive`) và có thể export các kiểu dữ liệu và functions để các module khác hoặc chương trình có thể sử dụng.

# Cách định nghĩa module

Thông thường, các module được sử dụng trong một dự án Aiken sẽ nằm trong thư mục mang tên dự án.

Chẳng hạn, nếu dự án của bạn tên là `nft-temmarketplace`, các module thường sẽ được tổ chức theo cấu trúc `lib/nft_marketplace/<module>` để dễ quản lý hơn

```rust
pub fn pub_get_hello_world() {
    get_hello_world()
}

fn get_hello_world() {
    "Hello World!"
}
```

Functions, type-aliases and constants có thể được export từ một module bằng cách sử dụng từ khóa `pub`. Còn nếu không có keyword pub thì những thành phần này sẽ ở trạng thái private → chỉ sử dụng được bên trong cùng module

# Cách import module để sử dụng

## Cách 1: Qualified imports

Sử dụng keyword `use` để import các module cần thiết. Để truy cập các function, type, hoặc thành phần khác, bạn chỉ cần kết hợp tên module với dấu chấm và tên của thành phần mong muốn.

```rust
use temp_project/utils

test temp() {
    let res = utils.pub_get_hello_world()

    res == "Hello World!"
}
```

### Custom names

Sử dụng keyword `as` để đặt tên khác cho module

```
use unix/doguse
use animal/dog as kitty
```

Hữu ích để phân biệt giữa nhiều module có cùng tên mặc định khi được import.

## Cách 2: Unqualified import

```rust
use temp_project/utils.{pub_get_hello_world}

test temp() {
    let res = pub_get_hello_world()

    res == "Hello World!"
}
```

Điều này có thể hữu ích cho các thành phần thường được sử dụng trong module, nhưng sử dụng  `qualified imports` được khuyến khích hơn vì mình sẽ biết được thành phần đó đền từ module nào.

# Opaque types

Đôi khi, việc tạo một kiểu và làm cho các constructor và fields (thuộc tính) của nó `private` có thể hữu ích, để người dùng chỉ có thể sử dụng type này thông qua các function được public.

Ví dụ, tạo type Counter để lưu trữ một số nguyên (int) là biến đếm có thể được tăng lên. Mình không muốn người dùng thay đổi giá trị ngoại trừ việc tăng nó lên 1 đơn vị ⇒ sử dụng `opaque` để ngăn họ thực hiện điều đó.

```rust
// The type is defined with the opaque keyword
pub opaque type Counter {
  Counter(Int)
}
 
pub fn new() {
  Counter(0)
}
 
pub fn increment(counter: Counter) {
  let Counter(value) = counter
  Counter(value + 1)
}
```

```rust
use temp_project/utils.{Counter}

test temp() {
    let a = Counter(1)
    True
}
```

Vì kiểu `Counter` được khai báo với keyword `opaque` nên code trong các module khác không thể gọi constructor hoặc pattern matching, cũng như không thể truy cập vào thuộc tính `value` 

```rust
use temp_project/utils.{new, increment}

test temp() {
    let a = new()
    let b = increment(a)
    True
}
```

Thay vào đó, các module khác có thể thao tác với opaque type thông qua các hàm được export từ module, trong trường hợp này là `new` và `increment`.

# Well-known modules

## prelude module

Mặc định, các type và value của module tự động được import vào mọi module.

[https://aiken-lang.github.io/prelude/aiken.html](https://aiken-lang.github.io/prelude/aiken.html)

## builtin module

Thư viện chuẩn (`stdlib`) đã bao bọc chúng trong một cách thân thiện hơn với Aiken, vì vậy mọi người không bao giờ cần sử dụng trực tiếp chúng

[https://aiken-lang.github.io/prelude/aiken/builtin.html](https://aiken-lang.github.io/prelude/aiken/builtin.html)