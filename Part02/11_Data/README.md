# Data

## Định nghĩa

`Data` là opaque compound type, đại diện cho bất kỳ kiểu dữ liệu do người dùng định nghĩa. Có thể hiểu data đại diện cho bất kì dữ liệu nào có thể serialize được.

**`Serialize`** là quá trình chuyển đổi dữ liệu thành một chuỗi byte (raw bytes) trong khi **`deserialize`** là quá trình ngược lại, biến chuỗi byte thành dữ liệu với định dạng mà ta mong muốn.

## Mục đích sử dụng

- Khi cần sử dụng các giá trị từ các kiểu dữ liệu khác nhau trong một cấu trúc đồng nhất - Data (để có thể lưu các phần tử trong List chẳng hạn vì List là danh sách các phần tử có cũng kiểu dữ liệu).
- Không cần biết chính xác kiểu dữ liệu tại thời điểm viết code (kiểu dữ liệu được xác định tại run time).
- Nhiều hàm built-in của Aiken chỉ làm việc với `Data` để xử lý tính đa hình

Ví dụ thực tế:

- Khi bạn cần tạo một danh sách chứa các phần tử có kiểu dữ liệu khác nhau, `Data` sẽ rất hữu ích.

Lưu ý:

- Mặc dù `Data` rất linh hoạt, nhưng việc sử dụng nó cũng đồng nghĩa với việc mất đi một số kiểm tra kiểu tại thời điểm biên dịch.
- Khi chuyển đổi từ `Data` sang một kiểu cụ thể, cần phải xử lý trường hợp chuyển đổi không thành công.

# Relationship between Custom Type with Data

## UpCasting

Bất kỳ kiểu dữ liệu do người dùng định nghĩa (→ không có primitive type) nào cũng có thể được ép kiểu (cast) thành `Data`.

Note: Upcasting luôn khả thi và an toàn

```rust
type Datum {
  count: Int,
}

test temp() {
    let datum: Datum = Datum { count: 1 } 

    let as_data: Data = datum

    True
}
```

## DownCasting

Và ngược lại ta có thể chuyển đổi từ `Data` sang bất kỳ kiểu tùy chỉnh nào

Note: Downcasting không an toàn và có khả năng fail phụ thuộc vào cách thức ta xử lý như thế nào

Có 2 cách:

- Sử dụng expect
- Sử dụng **Soft casting with `if/is`**

### Expect

Conversion sẽ thất bại nếu Data không thực sự là một biểu diễn hoặc một instance của custom type nào đó.

Trường hợp fail

```rust
type Datum {
  count: Int,
}

type A {
    val: ByteArray
}

test temp() {
    let datum: Datum = Datum { count: 1 } 

    let as_data: Data = datum

    expect A { val } = as_data

    val == ""
}
```

```rust
type Datum {
  count: Int,
}

type A {
    val: ByteArray
}

test temp() {
    let datum: Datum = Datum { count: 1 } 

    let as_data: Data = datum

    expect Datum { count } = as_data

    count == 1
}
```

### **Soft casting with `if/is`**

```rust
type Datum {
  count: Int,
}

fn soft_casting(d: Data) -> Bool {
  // with no pattern provided
    if d is Datum {
        d.count == 1
    }
    else {
        False
    }
}

test temp() {
    let datum: Datum = Datum { count: 1 } 

    let as_data: Data = datum

    soft_casting(as_data)
}

```