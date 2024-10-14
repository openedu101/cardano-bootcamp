# Control-flow

# Block

Trong Aiken, mỗi block đều là một expression. Mọi biểu thức bên trong block sẽ được thực thi tuần tự và giá trị của biểu thức cuối cùng sẽ là kết quả trả về.

Có thể sử dụng dấu ngoặc nhọn `{}` thay cho dấu ngoặc tròn `()` để xác định độ ưu tiên của các toán tử.

```rust
let celsius = { fahrenheit - 32 } * 5 / 9
```

# Piping

Aiken cung cấp cú pháp pipe operator (`|>`) giúp truyền kết quả của một function vào làm tham số cho function khác ⇒ Loại bỏ nhu cầu đóng ngoặc hay lồng ghép quá nhiều, giúp code trở nên gọn gàng và dễ đọc hơn.

Trước khi sử dụng `pipe operator`

```rust
use aiken/primitive/string

test temp() {
    let res = string.concat(string.concat(@"Hello", @" World"), @" !")

    res == @"Hello World !"
}
```

Sau khi sử dụng `pipe operator` 

```rust
use aiken/primitive/string

test temp() {
    let res = @"Hello"
            |> string.concat(@" World") 
            |> string.concat(@" !")

    res == @"Hello World !"
}
```

Lưu ý khi sử dụng pipe operator (|>):

1. **Thứ tự truyền tham số**: Pipe operator truyền kết quả của biểu thức trước làm `tham số đầu tiên` của function sau
2. **Kiểu dữ liệu**: Kết quả của hàm trước phải có kiểu tương thích với tham số của hàm sau. Nếu không, chương trình sẽ báo lỗi.
3. **Chỉ pipe vào hàm đầu tiên**: Pipe operator chỉ truyền giá trị vào vị trí tham số đầu tiên, các tham số khác của hàm cần được cung cấp thủ công nếu có.

# Looping through recursion

Aiken là ngôn ngữ lập trình functional, không cung cấp cấu trúc điều khiển vòng lặp nhưng thay vào đó hỗ trợ đệ quy để xử lý

Ví dụ về 1 function trong list được implement bằng đệ quy

```rust
pub fn all(self: List<a>, predicate: fn(a) -> Bool) -> Bool {
  when self is {
    [] -> True
    [x, ..xs] -> predicate(x) && all(xs, predicate)
  }
}
```

Mọi người cũng không cần bận tâm nhiều, vì hầu hết thư viện chuẩn (`stdlib`) đã xây dựng sẵn các hàm hỗ trợ thao tác với danh sách rồi.

# If-Else

Không nên dùng pattern matching cho giá trị Bool (dù vẫn dùng được) nhưng if-else sẽ quen thuộc và dễ hiểu hơn với developer.

```rust
let is_even = True
 
if is_even {
  4
} else {
  5
}
```

Lưu ý: Kiểu trả về của cả hai nhánh phải giống nhau. Ngoài ra, có thể mở rộng với nhiều nhánh `else/if` khác.

# Fail & Todo

Đôi khi, chúng ta cần dừng chương trình vì lỗi, trường hợp không hợp lệ, hoặc đơn giản là logic của hàm chưa hoàn thiện. Aiken hỗ trợ hai keyword: `Fail` và `Todo`  → cả 2 đều dùng việc thực thi chương trình

## Todo

Khi gặp keyword này, compiler sẽ hiện cảnh báo (warning)

## Fail

Nếu chương trình đang chạy mà gặp keyword này thì sẽ dừng ngay lập tức còn khi biên dịch thì sẽ không hiện warning nào

## Giving a reason

Có thể dùng kiểu `String` để giải thích lý do của `todo` và `fail`. Việc sử dụng `String` giúp hiển thị các ký tự dễ debug hơn, trong khi byte array chỉ là mảng byte, khó đọc hơn.

```rust
fn favourite_number() -> Int {
  todo @"Believe in the you that believes in yourself!"
}
 
fn expect_some_value(opt: Option<a>) -> a {
  when opt is {
    Some(a) -> a
    None -> fail @"Option has no value"
  }
}

test temp() {
    let a = expect_some_value(None)
    a == None
}
```

# Expect

`expect` giống như keyword let nhưng nó cho phép thực hiện `unsafe conversion`

Bên dưới là một trong những trường hợp sử dụng expect

## Non-exhaustive pattern matching

Khi sử dụng pattern matching, mình phải xử lý tất cả các constructor nhưng nếu chỉ quan tâm đến một constructor duy nhất và chắc chắn rằng giá trị sẽ thuộc constructor đó thì `expect` là giải pháp.

Tuy nhiên, `nhược điểm` của expect là nếu giá trị không khớp với constructor mong đợi, chương trình sẽ bị `crash`. Do đó, cách này nên được sử dụng hạn chế

```rust
test temp() {
    let x = Some(42)
 
    // As a pattern-match
    let y = when x is {
	    None -> fail
	    Some(y) -> y
    }
    
    // Using expect
    expect Some(y) = x

    y == 42
}
```

```rust
test temp() {
    // let x = Some(42)
    let x = None
 
    // As a pattern-match
    // let y = when x is {
    // None -> fail
    // Some(y) -> y
    // }
    
    // Using expect
    expect Some(y) = x

    y == 42
}
```