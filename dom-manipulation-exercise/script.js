// 1
const section = document.getElementById("container");
// 2
const section2 = document.querySelector("#container");
// 3
const liSecond = document.querySelector(".second");
// 4
const liThird = document.querySelector("ol .third");
// 5
section.innerText = "Hello!";
// 6
let footer = document.querySelector(".footer");
let main = footer.classList.add("main");
// 7
main = footer.classList.remove("main");
// 8
let li = document.createElement("li");
// 9
li.innerText = "four";
// 10
let loop = document.querySelectorAll("ol li")
for (let lis of loop) {
    lis.style.backgroundColor = "green";
}
// 11
footer.remove();