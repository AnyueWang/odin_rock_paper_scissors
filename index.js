const choices = ["rock", "paper", "scissors"];
const btnChoices = Array.from($(".choice"));
const btnPlay = document.querySelector(".play");
let isStart = false;
let nRound = 0;
let scores= { player: 0, computer: 0 };

function getComputerChoice() {
    return Math.floor(Math.random() * 3);;
}

function playRound(playerIndex, computerIndex) {
    if (playerIndex == computerIndex) { }
    else if ((playerIndex + 1) % 3 === computerIndex) { scores.computer++; }
    else { scores.player++; }
}

btnPlay.addEventListener("click", () => {
    if (!isStart) {
        isStart = true;
        nRound = 0;
        scores = { player: 0, computer: 0 };
        updateResult();
        document.querySelector("h1").textContent = `Round ${nRound + 1}. Please make your choice.`;

        removeChoiceImg("#my-choice");
        removeChoiceImg("#computer-choice");
    }
});

btnPlay.addEventListener("mouseover", (e) => {
    e.target.classList.add("hover-play");
});
btnPlay.addEventListener("mouseout", (e) => {
    e.target.classList.remove("hover-play");
});

btnChoices.forEach((choice) => {
    choice.addEventListener("mouseover", (e) => {
        e.target.classList.add("hover");
    });
    choice.addEventListener("mouseout", (e) => {
        e.target.classList.remove("hover");
    });
    choice.addEventListener("click", (e) => {
        if (isStart) {
            const playerIndex = choices.indexOf(e.target.id);
            const computerIndex = getComputerChoice();
            let title = document.querySelector("h1");

            displayChoice(playerIndex, "#my-choice");
            displayChoice(computerIndex, "#computer-choice");

            playRound(playerIndex, computerIndex);
            updateResult();
            nRound++;
            if (nRound < 5) {
                title.textContent = `Round ${nRound + 1}. Please make your choice.`;
            } else {
                title.textContent = (scores.player > scores.computer ?
                    "You win! 🏆" : (scores.player === scores.computer ?
                        "Tie! 🫱🏼‍🫲🏾" : "You lose! 😿")) + " Play again?";
                isStart = false;

            }
        }
    })
});

function removeChoiceImg(id) {
    const targetNode = document.querySelector(id);
    if (targetNode.hasChildNodes()) {
        targetNode.removeChild(targetNode.firstChild);
    }
}

function updateResult() {
    document.querySelector("#my-score").textContent = scores.player;
    document.querySelector("#computer-score").textContent = scores.computer;
}

function displayChoice(index, id) {
    const choiceImg = document.createElement("img");
    const choice = document.querySelector(id);
    choiceImg.setAttribute("src", `./images/${choices[index]}.svg`);
    choiceImg.classList.add("show-choice");
    if (nRound === 0) {
        choice.appendChild(choiceImg);
    } else {
        const currentChild = choice.firstChild;
        choice.replaceChild(choiceImg, currentChild);
    }
}
