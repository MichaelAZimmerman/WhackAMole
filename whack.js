let score = document.getElementById("score");
let timer = document.getElementById("timer");
let startGame = document.getElementById("startGame")
let hardGame = document.getElementById("hard")
let easyGame = document.getElementById("easy")
let gameRunning = false
// allows you to click "start game" button if game isnt
// currently running. resets score and timer.
startGame.addEventListener("click", (e => {
    if (gameRunning == false) {
        timer.innerText = "30";
        score.innerText = "0";
        gameRunning = true;
        // tells popUp funtion to run
        if (easyGame.checked){
        popUp();}
        else if (hardGame.checked){
            popupHard();
        }
        // starts the timer and tells game to end
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
        // if game is running, button does nothing:
        return;
    }
}))


//popUp is Easy mode
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

//HARD MODE
function popupHard() {
    let holeNum = Math.floor(Math.random() * 25 + 1); //picks a mole # randomly
    let holeNumBad = Math.floor(Math.random() * 25 + 1); //picks a bad mole # randomly
    if (holeNum === holeNumBad){ //if bad mole is same as good mole, start over
        popupHard()
    }
    else {
    let current = document.getElementById(`hole${holeNum}`); //assigns that random choice to id of mole div
    let currentBad = document.getElementById(`hole${holeNumBad}`);

    current.classList.add("mole") //adds mole class to that random choice
    currentBad.classList.add("badMole") //adds bad mole class to that other random choice
    current.addEventListener("click", (e) => {  //if you click the mole, add to score, and trigger popDown
        if (e.target.id === current.id && current.classList.contains('mole')) {  //clicking good mole
            score.innerText++; //gives you points
            popDown();  //takes away all moles
        }
    })
    currentBad.addEventListener("click", (e) => {  //if you click the mole, add to score, and trigger popDown
        if (e.target.id === currentBad.id && currentBad.classList.contains('badMole')){ //clicking bad mole
            score.innerText--; //takes away points
            popDownBad(); //removes moles
        }
    })
}

    setTimeout(() => { //sets amount of time moles are around for and watches timer

        popDown(); //if you dont click the mole, this timeout makes it popDown
        popDownBad();
        if (timer.innerText != 0) { //if game timer isnt "0", pop up again
            popupHard();
        }
    }, 1000 * Math.floor(Math.random() * 2 + 1)); //makes moles popUp every 1 or 2 seconds, randomly
}

function popDown() { //popDown removes mole and/or badmole (if hard mode is activated)
    if (document.querySelector(".mole")) { //finds mole
        document.querySelector(".mole").classList.remove("mole"); //removes mole
    }
}
    function popDownBad(){
    if (document.querySelector(".badMole")) { //finds bad mole
        document.querySelector(".badMole").classList.remove("badMole"); //removes bad mole
    }
}