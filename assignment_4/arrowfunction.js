// ES6
function add1(a, b) {
    return a + b;
}

// Arrow function
const add2 = (a, b) => a + b;

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isEvenNumber = n => n % 2 == 0 ? console.log(`Number ${n} is even`) : console.log(`Number ${n} is odd`);

rl.question('Enter a number: ', answer => {
    const num = parseInt(answer);
    isEvenNumber(num);
    rl.close();
})