function countDown(num) {
    let time = setInterval(function () {
        num--;
        if (num <= 0) {
            console.log("DONE!");
            clearInterval(time);
        }
        else {
            console.log(num);
        }
    },1000)
}
function randomGame() {
    let counter = 0;
    let time = setInterval(function () {
        let randomNum = Math.random();
        counter++;
        if (randomNum > .75) {
            console.log(`It took ${counter} tries.`);
            clearInterval(time);
        }
        else {
            randomNum;
        }
        
    }, 1000)
}