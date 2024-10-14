# Custom type

# Defining custom types

## Basic

Hiểu đơn giản, đây là cách khai báo một kiểu dữ liệu mới (giống như struct). Nó tương tự như đối tượng trong OOP, nhưng không có phương thức đi kèm.

`Custom type` là kiểu dữ liệu tuỳ chỉnh chứa các key và value (`named field`) hoặc chỉ chứa các giá trị (`unnamed fields`)

Custom types được định nghĩa bằng keyword `type`, và có thể chứa các trường `thuộc tính có tên` hoặc `không có tên`. Tuy nhiên, không thể kết hợp cả hai loại trường này trong cùng một constructor.

```rust
type People {
    People {name: ByteArray, age: Int }
}

type PeopleNameless {
    PeopleNameless(ByteArray, Int)
}

test temp() {
    let person = People {name: "Tung", age: 20}

    let personNameless = PeopleNameless("Tung", 20)

    True
}
```

## Shorthand notation

Nếu custom type muốn tạo chỉ có:

- 1 constructor
- type và constructor có cùng tên

Thì có thể khai báo như sau

```rust
type People {
    name: ByteArray,
    age: Int
}

test temp() {
    let person = People {name: "Tung", age: 20}

    let People {name, age} = person

    name == "Tung" && age == 20
}
```

```rust
type People {
    name: ByteArray,
    age: Int
}

type People {
	People { name: ByteArray, age: Int }
}

```

2 cách định nghĩa custom type này là như nhau

## Multiple constructor

Các bạn đã làm việc qua custom type với nhiều constructor đó là kiểu `Bool` và `Option` 

Kiểu dữ liệu `Bool` được xây dựng sẵn trong Aiken được định nghĩa như sau:

```rust
type Bool {
  False
  True
}
```

Nếu constructor không chứa giá trị gì cả thì nó thực sự giống như một `Enum`.

Các giá trị được tạo ra từ các constructor thường được gọi là `record` (mọi người có thể hiểu như là instance)

```rust
type User {
  LoggedIn { username: ByteArray } 
  Guest
}
```

`User` custom type có constructor `LoggedIn` tạo ra một record có thuộc tính `username`, trong khi constructor `Guest` lại tạo ra một record không chứa dữ liệu nào.

## Generics

Chắc hẳn các bạn đã từng làm việc với generic custom type, chẳng hạn như `Option`. Vậy tại sao chúng ta cần dùng generic?

Hãy tưởng tượng mình muốn tạo một kiểu `Box` với một thuộc tính `inner`. Nếu `inner` chứa số nguyên, mình sẽ tạo kiểu như sau:

```rust
type BoxInt {
    inner: Int
}

```

Nhưng nếu sau này muốn `inner` chứa kiểu dữ liệu khác, ví dụ như `ByteArray`, mình lại phải tạo thêm:

```rust
type BoxByteArray {
    inner: ByteArray
}

```

Việc này dẫn đến sự dư thừa, lặp lại mã nguồn. Sử dụng **generic** giúp tránh duplicate code, và tại thời điểm biên dịch, nó sẽ tự động sinh mã cho từng kiểu dữ liệu tương ứng.

```rust
type Box<inner_type> {
	Box {inner: inner_type}
}
```

Thuộc tính inner có kiểu là `inner_type`, đây là tham số type của Box. Nếu trường này chứa một giá trị kiểu Int, thì sẽ là Box<Int>. Nếu trường này chứa một chuỗi, thì sẽ là Box<ByteArray>.

# Inspecting custom types

## Name accessor

Chúng ta chỉ có thể sử dụng cách này khi custom type có duy nhất `một constructor` và các `trường dữ liệu` được `đặt tên`. Để truy cập các trường, ta dùng dấu chấm (.) kèm theo tên của trường tương ứng.

```rust
type People {
    name: ByteArray,
    age: Int
}

test temp() {
    let person = People {name: "Tung", age: 20}

    let name = person.name
    let age = person.age

    name == "Tung" && age == 20
}
```

## **Destructuring**

**Destructuring** là quá trình ngược lại với **constructuring**. Trong khi **constructuring** là việc gán giá trị cho các trường dữ liệu ở bên phải, thì d**estructuring** diễn ra ở phía bên trái, cho phép bạn lấy ra các giá trị từ record và gán chúng cho các biến tương ứng.

```rust
type People {
    name: ByteArray,
    age: Int
}

test temp() {
    let person = People {name: "Tung", age: 20}

    let People {name, age} = person

    name == "Tung" && age == 20
}
```

Ngoài ra, bạn có thể gán giá trị này cho các biến mới, thay vì sử dụng trực tiếp các biến thuộc tính trong record. Điều này cho phép bạn tạo ra các tên biến khác nhau, giúp dễ dàng quản lý và sử dụng trong mã nguồn.

```rust
type People {
    name: ByteArray,
    age: Int
}

test temp() {
    let person = People {name: "Tung", age: 20}

    let People {name: my_name, age: my_age} = person

    my_name == "Tung" && my_age == 20
}
```

Đối với các kiểu dữ liệu không tên (nameless types), việc destructuring các thuộc tính sẽ được thực hiện theo thứ tự mà chúng được khai báo. Điều này có nghĩa là bạn có thể truy xuất các giá trị dựa trên vị trí của chúng trong kiểu dữ liệu, thay vì phải chỉ định tên của từng thuộc tính.

```rust
type PeopleNameless {
    PeopleNameless(ByteArray, Int)
}

test temp() {
    let personNameless = PeopleNameless("Tung", 20)

    let PeopleNameless(name, age) = personNameless

    name == "Tung" && age == 20
}
```

## Pattern matching

Nếu custom type có nhiều constructor thì phải xử lý hết cho các constructor

Nói đơn giản hơn nó giống như yêu cầu trình biên dịch “nếu dữ liệu có hình dạng này thì xử lý như thế”, đối với tất cả các hình dạng có thể có.

```rust
type Dog {
    Dog {name: ByteArray, age: Int}
    Dog2 {name: ByteArray, age: Int}
}

test temp() {
    let dog: Dog = Dog2 {name: "Ben", age: 21}

    let name = when dog is {
        Dog2 {name, ..} -> name
        _ -> "Empty"
    }

    name == "Ben"   
}
```

### Wildcard

Khi làm việc với pattern, bắt buộc phải xử lý từng trường hợp nhưng đôi khi việc này sẽ phức tạp

Wildcard: `_` (hoặc identifier bắt đầu với `_` ) đại diện cho các trường hợp còn lại

```rust
fn get_name(user: User) -> ByteArray {
  when user is {
    LoggedIn { username } -> username
    _ -> "Guest user"
  }
}
```

Lưu ý: wildcard thường không khuyến khích được sử dụng.

Ví dụ mình thêm constructor `LoggedInAsAdministrator` vào type `User`, thì lúc này `LoggedInAsAdministrator` và `Guest` sẽ là các constructor còn lại. Việc return `Guest user` sẽ không hợp lý, vì đăng nhập bằng admin mà lại trả về guest user.

Do đó, tốt nhất là nên xử lý tất cả trường hợp một cách rõ ràng.

```rust
type User {
  LoggedInAsAdministrator { username: ByteArray }
  LoggedIn { username: ByteArray }
  Guest
}

```

### Spread operator

Đôi khi, chỉ cần lấy một vài field hoặc không field nào cả. Aiken cung cấp spread operator để hỗ trợ điều này

Spread operator cũng có thể được sử dụng cho destructuring, cho phép bạn chỉ lấy các field mong muốn mà không cần phải lấy toàn bộ.

```rust
type Dog {
    Dog(ByteArray, Int)
}

test temp() {
    let dog = Dog("Eric", 21)

    let Dog(name, ..) = dog

    name == "Eric"   
}
```

```rust
type Dog {
    name: ByteArray,
    age: Int
}

test temp() {
    let dog = Dog {name: "Ben", age: 21}

    let Dog {name, ..} = dog

    name == "Ben"   
}
```

# Updating custom types

Để thay đổi giá trị của các thuộc tính trong record của `custom type`, ta có thể sử dụng `spread operator`. Cách này cho phép bạn giữ lại tất cả các thuộc tính cùng với giá trị của chúng. Sau đó, ta chỉ cần thêm các thuộc tính mà bạn muốn thay đổi vào trong constructor.

```rust
type People {
    People {name: ByteArray, age: Int }
}

test temp() {
    let person = People {name: "Tung", age: 20}

    let new_age_person = People {..person, age: 25}

    let People {name, age} = new_age_person

    age == 25
}
```

# Type alliases

Là đặt  tên mới cho một kiểu dữ liệu đã có mà không kèm theo bất kỳ thông tin bổ sung nào. Điều này giúp mã nguồn trở nên dễ đọc và dễ hiểu hơn.

```rust
type MyNum = Int
```