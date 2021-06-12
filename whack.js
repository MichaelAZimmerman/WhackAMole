let score = document.getElementById("score");
let timer = document.getElementById("timer");
let startGame = document.getElementById("startGame")
let hardGame = document.getElementById("hardGame")
let gameRunning = false
// allows you to click "start game" button if game isnt
// currently running. resets score and timer.
startGame.addEventListener("click", (e => {
    if (gameRunning == false) {
        timer.innerText = "30";
        score.innerText = "0";
        gameRunning = true;
        // tells popUp funtion to run
        popUp();
        // stars the timer and tells game to end
        // at 0 seconds remaining.
        let countDown = setInterval(() => {
            if (timer.innerText == 0) {

                clearInterval(countDown)
                gameRunning = false
            }
            else {
                timer.innerText--;
            }
        }, 1000);
    }
    else {
        // if game is running, do nothing:
        return;
    }
}))



function popUp() {
    let holeNum = Math.floor(Math.random() * 25 + 1); //picks a mole # randomly
    let current = document.getElementById(`hole${holeNum}`); //assigns that random choice to id of mole div

    current.classList.add("mole") //adds mole class to that choice
    current.addEventListener("click", (e) => {  //if you click the mole, add to score, and trigger popDown
        if (e.target.id === current.id && current.classList.contains('mole')) {
            score.innerText++;
            popDown();

        }
    })

    setTimeout(() => {

        popDown(); //if you dont click the mole, this timeout makes it popDown
        if (timer.innerText != 0) { //if game timer isnt "0", pop up again
            popUp();
        }
    }, 1000 * Math.floor(Math.random() * 2 + 1)); //makes moles popUp every 1 or 2 seconds, randomly
}

function popDown() {
    if (document.querySelector(".mole")) { //finds mole
        document.querySelector(".mole").classList.remove("mole"); //removes mole
    }
}