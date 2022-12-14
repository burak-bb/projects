const form = document.querySelector("form");
const todoInput = document.getElementById("todoInput")
const submitBtn = document.getElementById("submit")
const ul = document.querySelector("ul");

submitBtn.addEventListener("click", addTodo);
ul.addEventListener("click", checkOrRemove);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(e) {
    e.preventDefault();

    const removeBtn = document.createElement("button")
    const li = document.createElement("li");
    const div = document.createElement("div");

    removeBtn.innerText = "X"
    li.innerText = todoInput.value;

    div.appendChild(li);
    div.appendChild(removeBtn)
    ul.appendChild(div);

    saveTodos(todoInput.value);

    todoInput.value = "";
}


function checkOrRemove(e) {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        removeLocalTodos(e.target.previousSibling.innerText);

    }
    else if (e.target.tagName === "LI") {
        e.target.style.textDecoration = "line-through"
        checkedLocalTodos(e)
    }
}

function saveTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(function(todo) {

        const removeBtn = document.createElement("button")
        const li = document.createElement("li");
        const div = document.createElement("div");
    
        removeBtn.innerText = "X"
        li.innerText = todo;
    
        div.appendChild(li);
        div.appendChild(removeBtn)
        ul.appendChild(div);
    
    });
}

function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
