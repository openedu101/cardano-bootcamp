# Functions

# Defining functions

## Named functions

Trong Aiken, để định nghĩa hàm, ta dùng keyword `fn`, đi kèm với:

- Tham số bắt buộc có kiểu dữ liệu.
- Hàm luôn có kiểu trả về, được xác định rõ ràng

Tương tự như Rust, Aiken không cần dùng từ khóa return để trả kết quả, giá trị cuối cùng trong hàm tự động được trả về.

```rust
fn add(x: Int, y: Int) -> Int {
  x + y
}
 
fn multiply(x: Int, y: Int) -> Int {
  x * y
}
```

Hàm có thể được truyền vào như một tham số cho hàm khác

```rust
/// This function takes a function as an argument
fn twice(f: fn(t) -> t, x: t) -> t {
  f(f(x)) // f (x + 1) -> (x + 1) + 1 -> x + 2
}
 
fn add_one(x: Int) -> Int {
  x + 1
}
 
fn add_two(x: Int) -> Int {
  twice(add_one, x)
}
```

Hàm twice là `generic function`, sẽ được đề cập ở bên dưới.

## Anonymous function

Định nghĩa hàm ẩn danh (anonymous function) tương tự như hàm có tên (named function), nhưng không cần tên và được gán cho biến bằng từ khóa let.

```rust
fn run() {
  let add = fn(x, y) { x + y }
 
  add(1, 2)
}
```

Không thể định nghĩa reccursive anonymous function. Bạn phải định nghĩa hàm đệ quy ở top-level (không nằm bên trong hàm).

# Labeled arguments

Như đã đề cập ở phía trên, khi gọi hàm phải gọi đúng theo thứ tự của các tham số đã được định nghĩa. Khi hàm có quá nhiều tham số, đòi hỏi bạn phải nhớ chính xác vị trí của chúng.

⇒ Aiken giải quyết vấn đề này bằng cách hỗ trợ `labeled arguments`, cho phép bạn xác định tham số dựa trên nhãn (label) thay vì vị trí, giúp việc gọi hàm trở nên dễ dàng và trực quan hơn.

```rust
fn replace(self: String, pattern: String, replacement: String) {
  // ...
}
```

```rust
replace(self: @"A,B,C", pattern: @",", replacement: @" ")
 
// Labeled arguments can be given in any order
replace(pattern: @",", replacement: @" ", self: @"A,B,C")
 
// Positional arguments and labels can be mixed
replace(@"A,B,C", pattern: @",", replacement: @" ")
```

## Overriding default labels

Lưu ý, khi định nghĩa một hàm, có thể ghi đè các nhãn mặc định, cho phép sử dụng những tên khác (tên ngắn hơn) trong body của function.

```rust
fn insert(self: List<(String, Int)>, key k: String, value v: Int) {
  // ... do something with `k` and `v`
}
```

Vẫn có thể gọi hàm bằng cách sử dụng `key` và `value`, nhưng bên trong body của function, có thể gọi `k` và `v` để tiện lợi hơn.

# Type annotations

Như đã đề cập, compiler của Aiken rất thông minh, có khả năng suy diễn kiểu dữ liệu cho code Aiken ngay cả khi không khai báo kiểu trả về. Cả hai cách đều đảm bảo an toàn. Tuy nhiên, vẫn được khuyến khích khai báo kiểu để giúp người khác dễ dàng đọc hiểu mã và làm cho code trở nên rõ ràng hơn.

```rust
fn identity(x: some_type) -> some_type {
  x
}
 
fn inferred_identity(x) {
  x
}
```

# Generic functions

Đôi khi ta muốn viết 1 hàm nào đõ mà có thể xử lý cho nhiều kiểu dữ liệu

Ví dụ: hàm nhận vào 1 giá trị có kiểu dữ liệu bất kỳ và trả về một danh sách chứa hai giá trị được truyền vào.

Đôi khi, ta muốn viết một hàm có khả năng xử lý nhiều kiểu dữ liệu khác nhau. Ví dụ, hàm có thể nhận vào một giá trị với kiểu dữ liệu bất kỳ và trả về một danh sách chứa hai phần tử (đều là giá trị truyền vào)

```rust
fn list_of_two(my_value: a) -> List<a> {
  [my_value, my_value]
}
```

Type variable `a` được sử dụng để biểu diễn bất kỳ kiểu dữ liệu nào.

Type variable (parameter) có thể được đặt tên tùy ý, bao gồm cả dấu gạch dưới (_), nhưng bắt buộc phải là chữ thường (lowercase).