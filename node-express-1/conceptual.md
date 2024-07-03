### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
async/await, promise

- What is a Promise?
represent a value thats available in future

- What are the differences between an async function and a regular function?
async function returns a promise

- What is the difference between Node.js and Express.js?
Express.js is a web application framework built on Node.js to simplify and enhance web server and API development.

- What is the error-first callback pattern?
error object

- What is middleware?
 is a function that processes requests and responses

- What does the `next` function do?
pass control to the next middleware function

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
Error Handling
Naming
should use promise.all
The returned array is not in the same order as the requests.


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
