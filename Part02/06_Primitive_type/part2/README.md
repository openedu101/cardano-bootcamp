# Primitive Types (P2)

Ngoài ra, ngôn ngữ cũng cung cấp một số cấu trúc dữ liệu như collection và custom type như lists, tuples, options, pairs…

# List

Danh sách các phần tử phải cùng kiểu dữ liệu

```rust
let list_num = [1, 2, 3]
```

Khi thêm phần tử vào `List` trong Aiken (phần tử mới sẽ được thêm vào đầu danh sách ⇒ nhanh). 

Tuy nhiên, cấu trúc dữ liệu trong Aiken là bất biến (immutable), nghĩa là khi thêm một phần tử mới nó sẽ tạo ra một danh sách hoàn toàn mới thay vì thay đổi danh sách hiện tại.

```rust
use aiken/collection/list

test temp() {
    let a = [1, 2, 3]

    let b = list.push(a, 4)

    b == [4, 1, 2, 3]
}
```

`range` : tạo danh sách các số nguyên trong 1 khoảng nào đó

```rust
use aiken/collection/list

test temp() {
    let a = list.range(0, 4)

    a == [0 , 1, 2, 3, 4]
}
```

`length` : số lượng các phần tử trong danh sách

```rust
use aiken/collection/list

test temp() {
    let a = [1, 2 , 3]
    let len = list.length(a)

    len == 3
}
```

`delete` : xoá lần xuất hiện đầu tiên của phần tử mong muốn trong danh sách

```rust
use aiken/collection/list

test temp() {
    let a = [1, 2, 3, 1]
    
    let b = list.delete(a, 1)

    b == [2, 3, 1]
}
```

Mọi người có thể xem thêm các function khác của `List` tại đây: [https://aiken-lang.github.io/stdlib/aiken/collection/list.html](https://aiken-lang.github.io/stdlib/aiken/collection/list.html)

# Tuple

Tuple được sử dụng để nhóm các giá trị lại với nhau, cho phép mỗi phần tử trong đó có thể mang kiểu dữ liệu khác nhau

```rust
let a = (1, "VBI Academy")
```

Tuple với `hơn 3 phần tử` thường không được khuyến khích sử dụng. Lý do là tuple chỉ là một anonymous constructor (sẽ rõ hơn trong phần `custom type`). Mặc dù tuple rất nhanh và tiện lợi, nhưng về lâu dài có thể gây khó khăn khi đọc lại code, vì sẽ khó nắm bắt được ý nghĩa của các giá trị bên trong.

Để truy cập các phần tử trong tuple, sử dụng dấu chấm (.) theo sau là số thứ tự (ordinal) của phần tử cần lấy.

```rust
test temp() {
    let a = (1, "VBI Academy")

    let b = a.1st
    let c = a.2nd

    b == 1 && c == "VBI Academy"
}
```

## Pair

Aiken có một kiểu dữ liệu đặc biệt để biểu diễn cặp giá trị (không nhất thiết phải cùng kiểu dữ liệu). Vì vậy `Pair<a, b>` tương tự như một `2-tuple (a, b)`.

Tại sao không dùng tuple mà phải có kiểu `Pair` riêng?

- Các lý do liên quan đến lớp thấp hơn thì mọi người không cần quá bận tâm. Nếu hứng thú, bạn có thể tìm hiểu thêm chi tiết tại đây: [https://aiken-lang.org/language-tour/primitive-types#pair](https://aiken-lang.org/language-tour/primitive-types#pair).

# Pairs

Hay còn gọi là `associative lists` 

`Type Pairs<a, b> = List<Pair<a, b>>`

Trong validator's script contexts, tất cả các cặp giá trị (pairs) thường được biểu diễn theo cách này.

```rust
use aiken/collection/pairs

test temp() {
    let a = [Pair(1, "VBI Academy"), Pair(2, "Hello Wolrd")]

    let keys = pairs.keys(a)

    keys == [1, 2]
}
```

Mọi người có thể xem thêm các function khác của `Pairs` tại đây:  [https://aiken-lang.github.io/stdlib/aiken/collection/pairs.html](https://aiken-lang.github.io/stdlib/aiken/collection/pairs.html)

Khác với `Dict`

- Không phải tập hợp ⇒ key có thể bị trùng lặp
- Không quan trọng thứ tự ⇒ khi tìm kiếm phải duyệt qua toàn bộ danh sách

# Dict

- Tập hợp key-value pairs có thứ tự
- Mỗi key chỉ xuất hiện 1 lần
- Tất cả key được lưu trữ theo thứ tự tăng dần

```rust
use aiken/collection/dict

test temp() {
    let res = dict.from_pairs([Pair("b", 200), Pair("a", 100)])

    let tmp = dict.to_pairs(res)

    tmp == [Pair("a", 100), Pair("b", 200)]
}
```

Mọi người có thể xem thêm các function khác của `Dict` tại đây:  [https://aiken-lang.github.io/stdlib/aiken/collection/dict.html](https://aiken-lang.github.io/stdlib/aiken/collection/dict.html)

# Option
Option là `generic type` với hai constructor (sẽ được trình bày chi tiết hơn trong phần `custom type`).

```rust
type Option<a> {
  Some(a) // có giá trị
  None // không có giá trị
}
```

`a` là type parameter, cho phép variant `Some` của Option chứa bất kỳ kiểu dữ liệu nào.

Mục đích của kiểu `Option` là cung cấp cách tiếp cận chặt chẽ hơn cho việc xử lý lỗi (error handling) ⇒ giảm thiểu lỗi khi truy cập vào các giá trị không tồn tại và buộc developer phải xử lý các tình huống này một cách rõ ràng

```rust
test temp() {
    let a = Some(2)

    let res = when a is {
        Some(b) -> b + 2
        None -> 0
    }

    res == 4
}
```

Mọi người có thể xem thêm các function khác của `Option` tại đây:  [https://aiken-lang.github.io/stdlib/aiken/collection/dict.html](https://aiken-lang.github.io/stdlib/aiken/collection/dict.html)

# Rational

Trong phần kiểu dữ liệu nguyên thủy (`primitive type`), mình đã đề cập rằng Aiken chỉ hỗ trợ kiểu số nguyên (`Integer`). Để xử lý các phép tính số thực, mình sẽ sử dụng kiểu số hữu tỷ (`Rational`) từ `aiken-lang/stdlib`. Đây là `custom type` chi tiết mình sẽ giải thích ở bài sau.

```rust
use aiken/math/rational

test temp() {
    let a = rational.new(4, 6)

    let reduce = when a is {
        Some(a) -> {
            rational.reduce(a)
        }
        None -> {
            expect Some(x) = rational.new(1, 1)
            x
        }
    }

    expect Some(result) = rational.new(2, 3)

    reduce == result
}
```

Mọi người có thể xem thêm các function khác của `Rational` tại đây: [https://aiken-lang.github.io/stdlib/aiken/math/rational.html](https://aiken-lang.github.io/stdlib/aiken/math/rational.html)