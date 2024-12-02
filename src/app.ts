import express from 'express';
import dotenv from "dotenv";
import DB from './config/database'; 
import { APIs } from './utils/apisWrapper';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


let test1 = {"x": 7, "y": 10}
let test2 = test1

const handler = {
    get(target, prop) {
      return `Property "${prop}" doesn't exist.`;
    }
  };
  
//   const proxy = new Proxy({}, handler);
//   console.log(proxy.name);

let v = Object.entries(test1)

// console.log(v.entries().next())

// for(;;){
//     console.log()
// }

BigInt(50000000000000000000000) // or 500000000000000000n


const modulePattern = function () {
    let text = "private"
    const changeText = () => {
        text = "public"
    }

    return {
        cb: () => {
            changeText()
            console.log('has changed to public successfully')
        }
    }
}

modulePattern().cb()


Object.freeze(test1)

console.log(Object.isFrozen(test1))


let myage = 10
const letsTest = () => {
    function innerTest() {
        myage += 5; // in closure it changes by reference
        return myage
    }
    
    return innerTest()
}

let ans = letsTest()
console.log(ans)

const err = new SyntaxError("error").stack

console.log('Hello => number 1');

setTimeout(() => {
    console.log('The timeout running last => number 4');
  }, 0);

setImmediate(() => {
  console.log('Running before the timeout => number 3');
});

process.nextTick(() => {
  console.log('Running at next tick => number 2');
});



(function(){
    console.log(this); // undefined in 'use strict'
}());

( async() => {
    
    const x = 1;
    const y = 9;

    console.log(`Hello, The Answer is ${x+y}`);

})();


let a = new Number(3)
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', typeof a)


// console.log(global)

import { Buffer } from 'buffer'
const buf = Buffer.from(arr)

console.log(buf)

// setImmediate()

import os from 'os'

console.log(process.memoryUsage().external)
console.log(process.title)

console.log(process.cwd())



APIs(app);

app.all('*', (_req, _res, next) => {
    const err = new Error("Page not found");
    return next(err);
});


app.use((err, _req, res, _next) => {
    return res.status(404).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
});


DB.getInstance(process.env.CONNECTION_STRING || "")
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });