const section = document.querySelector(".game");
const restart = document.querySelector(".restart");

restart.addEventListener("click", function restartGame(e) {
    location.reload();
})

window.addEventListener('DOMContentLoaded', (event) => {});
// create an array of the images
const images = [
    { imgSrc: "./images/Bat.png", name: "bat" },
    { imgSrc: "./images/Bones.png", name: "bones" },
    { imgSrc: "./images/Cauldron.png", name: "cauldron" },
    { imgSrc: "./images/Dracula.png", name: "dracula" },
    { imgSrc: "./images/Eye.png", name: "eye" },
    { imgSrc: "./images/Ghost.png", name: "ghost" },
    { imgSrc: "./images/Pumpkin.png", name: "pumpkin" },
    { imgSrc: "./images/Skull.png", name: "skull" },
    { imgSrc: "./images/Bat.png", name: "bat" },
    { imgSrc: "./images/Bones.png", name: "bones" },
    { imgSrc: "./images/Cauldron.png", name: "cauldron" },
    { imgSrc: "./images/Dracula.png", name: "dracula" },
    { imgSrc: "./images/Eye.png", name: "eye" },
    { imgSrc: "./images/Ghost.png", name: "ghost" },
    { imgSrc: "./images/Pumpkin.png", name: "pumpkin" },
    { imgSrc: "./images/Skull.png", name: "skull" }
];

// shuffle the images
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    return  arr;
}

// Add the elements for each image
for (let color of shuffle(images)) {
    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");
    const backImage = document.createElement("img")

    card.classList.add("card");
    front.classList.add("front-face");
    back.classList.add("back-face");

    backImage.src = color.imgSrc;
    card.setAttribute("name", color.name);

    back.appendChild(backImage);
    card.appendChild(front);
    card.appendChild(back);
    section.appendChild(card);

    //flip the card when its clicked
    card.addEventListener("click", flip);
    function flip(e) {
        card.classList.toggle("flip");
        checkCards(e);
    }
};

function checkCards(e) {
    const clicked = e.target;
    clicked.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped")


    if (flippedCards.length === 2) {
        
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            for (let card of flippedCards) {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none"
            }
        }

        else {
            for (let card of flippedCards) {
                card.classList.remove("flipped");
                section.style.pointerEvents = "none";
                setTimeout(() => {
                    section.style.pointerEvents = "visible";
                    card.classList.remove("flip");
                }, 1500);
                };
            };
            
        };
    };


