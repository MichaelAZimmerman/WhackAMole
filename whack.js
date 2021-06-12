let score = document.getElementById("score");
let timer = document.getElementById("timer");
let startGame = document.getElementById("startGame")
let gameRunning = false

startGame.addEventListener("click", (e => {
    if (gameRunning == false) {
        timer.innerText = "30";
        score.innerText = "0";
        gameRunning = true;
        popUp();
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
        return;
    }
}))

function popUp() {
    let holeNum = Math.floor(Math.random() * 25 + 1);
    let current = document.getElementById(`hole${holeNum}`);

    current.classList.add("mole")
    current.addEventListener("click", (e) => {
        if (e.target.id === current.id && current.classList.contains('mole')) {
            score.innerText++;
            popDown();

        }
    })

    setTimeout(() => {

        popDown();
        if (timer.innerText != 0) {
            popUp();
        }
    }, 1000 * Math.floor(Math.random() * 2 + 1));
}

function popDown() {
    if (document.querySelector(".mole")) {
        document.querySelector(".mole").classList.remove("mole");
    }
}