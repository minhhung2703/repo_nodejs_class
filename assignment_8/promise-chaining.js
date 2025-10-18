
function sumNumber(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a == "number" && typeof b == 'number') {
            resolve(a + b);
        } else {
            reject("Invalid input: both parameters must be numbers.");
        }
    });
}

sumNumber(3, 5)
    .then(result => console.log("Result: " + result))
    .catch(error => console.log("Error: " + error))
    .finally(() => {
        console.log("Finished Promise");
        return sumNumber(5, "Mick")
            .then(result => console.log("Result: " + result))
            .catch(error => console.log("Error: " + error))
            .finally(() => console.log("Finished Promise"))
    });