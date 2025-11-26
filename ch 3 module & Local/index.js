
const { add, sub } = require('./math');

console.log(add(10, 20));
console.log(sub(70, 20));

const students = {
    name: "Sagar",
    age: 24,
    course: "Full stack"
}

let { name, age, course } = students;


console.log(`stu name : ${name}`);
console.log(`stu age : ${age}`);
console.log(`stu course : ${course}`);
