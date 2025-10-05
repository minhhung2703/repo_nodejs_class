// Destructing.js
const numbers = [1, 2, 3];
const [a, b, c] = numbers;
console.log(a, b, c); // 1 2 3

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

// Skip elements
const [x, , y] = numbers;
console.log(x, y); // 1 3

// Rest Operator
const [first, ...rest] = numbers;
console.log(first); // 1
console.log(rest);  // [2, 3, 4]

// Magic comma
const [one, , , four] = numbers;
console.log(one); // 1
console.log(four);  // 4

// Destructuring object
const person = { name: 'Alice', age: 25, city: 'New York' };
const { name, age, city } = person;

console.log(name); // Alice
console.log(age);   // 25
console.log(city);  // New York

// Nested destructuring
const student = {
    id: 1,
    name: 'Bob',
    scores: {
        math: 90,
        english: 85,
    },
};

const { name: studentName, scores: { math, english } } = student;
console.log(studentName);

const user = [
    {
        id: 1,
        name: 'Charlie',
        address: {
            city: 'Los Angeles',
        },
    },
    {
        id: 2,
        name: 'John',
        address: {
            city: 'Chicago',
        },
    },
    {
        id: 3,
        name: 'Mary',
        address: {
            city: 'Houston',
        },
    },
];

const [...user1] = user;
console.log(user1);