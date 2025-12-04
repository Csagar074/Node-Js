console.log("Hello World");
console.log(__filename);
console.log(__dirname);

let time = 59;

// Timeout example
setTimeout(() => {
    console.log("Hello Node js");
}, 10000);

// Interval example (Countdown)
setInterval(() => {
    if (time === 0) {
        return;
    }
    
    console.log(`Hello i am sagar ${time}`);
    time--;
}, 1000);
