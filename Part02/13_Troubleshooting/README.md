# Troubleshooting

Lập trình on-chain đòi hỏi sự tỉ mỉ vì môi trường thực thi bị hạn chế. Các chương trình cần được tối ưu hóa kỹ lưỡng, thường không có nhiều không gian để xử lý lỗi hay gỡ lỗi.

Aiken cung cấp cho các developer những công cụ hỗ trợ debug nâng cao, giúp quá trình phát triển trở nên dễ dàng hơn.

# Traces

Traces giống như `log messages` được VM ghi lại tại những thời điểm cụ thể trong quá trình chạy chương trình.

```rust
fn is_even(n: Int) -> Bool {
  trace @"is_even"
  n % 2 == 0
}
 
fn is_odd(n: Int) -> Bool {
  trace @"is_odd"
  n % 2 != 0
}
```

Trace sẽ được ghi lại nếu nó được thực thi bởi VM. 

Có hai cách phổ biến để capture trace trong Aiken: 

- Khi chạy test với `aiken check`
- Khi mô phỏng transaction với `aiken tx simulate`.

Trong cả hai trường hợp, các trace thu được trong quá trình thực thi.sẽ được in ra màn hình.

```rust
fn is_even(n: Int) -> Bool {
  trace @"is_even"
  n % 2 == 0
}
 
fn is_odd(n: Int) -> Bool {
  trace @"is_odd"
  n % 2 != 0
}
```

Chỉ trace của hàm `*is_even*` sẽ được ghi lại, vì thực tế `*is_odd*` không bao giờ được thực thi (không cần thiết vì biểu thức bên trái đã trả về `*True*`).

```rust
let n = 10
is_even(n) || is_odd(n)
```

Từ phiên bản `v1.1.0`, trace không còn bị giới hạn ở string. Mình có thể trace bất kỳ giá trị nào có khả năng serialize. 

Các giá trị này sẽ được trace theo cú pháp CBOR diagnostics được mô tả bên dưới.

| **Type** | **Examples** |
| --- | --- |
| `Int` | `1`, `-14`, `42` |
| `ByteArray` | `h'FF00'`, `h'666f6f'` |
| `List` | `[]`, `[1, 2, 3]`, `[_ 1, 2, 3]` |
| `Map` | `{}`, `{ 1: h'FF', 2: 14 }`, `{_ 1: "AA" }` |
| `Tag` | `42(1)`, `10(h'ABCD')`, `1280([1, 2])` |

Chi tiết về CBOR diagnostics. Mọi người có thể xem ở đây [https://aiken-lang.org/language-tour/troubleshooting#cbor-diagnostic](https://aiken-lang.org/language-tour/troubleshooting#cbor-diagnostic)

# ? Operator

Hiểu đơn giản là smart contract onchain thường là các điều kiện (các hàm trả về true hoặc false). Do đó, thông thường, các smart contract onchain sử dụng phép and và or với các biểu thức boolean 

Tuy nhiên, việc xác định ngữ cảnh ban đầu để tạo ra biến boolean thường gặp nhiều khó khăn.

```
let must_be_after = True
let must_spend_token = False
 
must_be_after && must_spend_token
```

⇒ Aiken cung cấp toán tử `?`. Toán tử hậu tố này có thể được thêm vào bất kỳ biểu thức boolean nào và sẽ trace biểu thức chỉ khi giá trị False ⇒ dễ theo dõi toàn bộ quá trình thực thi dẫn đến biểu thức cuối cùng là False. 

Ví dụ: nếu `must_spend_token = false`, ta sẽ xem xét các logic liên quan đến biến `must_spend_token` để tiến hành gỡ lỗi.

```
must_be_after? && must_spend_token?
```

Ngoài ra, toán tử ? hoạt động giống như trace và do đó bị ảnh hưởng bởi các tùy chọn --keep-traces và --no-traces. Khi biên dịch cho môi trường production, nó không ảnh hưởng đến chương trình và sẽ hoạt động như thể nó không tồn tại.