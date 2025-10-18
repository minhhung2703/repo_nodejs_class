// Promise là lời hứa nhưng sau đó sẽ trả về lại giá trị thành công (Resolve) hoặc thất bại (Reject)
// Promise sẽ xử lý bất đồng bộ như call API, Readfile hoặc xử lý dữ liệu từ server

/* - Step 1: Thực hiện tác vụ bất đồng bộ
   - Step 2: Xử lý kết quả của Promise bằng cách hàm:
    + resolve: xử lý kết quả thành công 
    + reject: xử lý kết quả thất bại
    + finally: luôn chạy, dù thành công hay thất bại
*/
function sumNumber(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a == "number" && typeof b == "number") {
            resolve(a + b);
        } else {
            reject("Invalid input: both parameters must be numbers.");
        }
    });
}

sumNumber(3, 5)
    .then(result => console.log("Result: " + result))
    .catch(err => console.log("Error:" + err))
    .finally(() => console.log("Finished Promise"))

sumNumber(3, "Mick")
    .then(result => console.log("Result: " + result))
    .catch(err => console.log("Error:" + err))
    .finally(() => console.log("Finished Promise"))