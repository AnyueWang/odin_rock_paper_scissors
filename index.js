const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
    return Math.floor(Math.random() * 3);;
}

function playRound(playerIndex, computerIndex, scores) {
    let playerSelection = choices[playerIndex];
    let computerSelection = choices[computerIndex];
    if (playerIndex == computerIndex) {
        return "It's a tie."
    } else if ((playerIndex + 1) % 3 === computerIndex) {
        scores.computer++;
        return `You Lose! ${standardOutput(computerSelection)} beats ${standardOutput(playerSelection)}`
    } else {
        scores.player++;
        return `You Win! ${standardOutput(playerSelection)} beats ${standardOutput(computerSelection)}`
    }
}

function standardOutput(name) {
    return name[0].toUpperCase() + name.slice(1);
}

function playGame() {
    let scores = {player: 0, computer: 0};
    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt(`Round ${i + 1}. Please input your selection: rock, paper, or scissors`);
        const playerIndex = choices.indexOf(playerSelection.toLowerCase());
        const computerIndex = getComputerChoice();
        $(".results").append(`<h3>Round ${i + 1}: You: ${standardOutput(playerSelection)}; Computer: ${standardOutput(choices[computerIndex])} </h3>`);
        $(".results").append(`<p>${playRound(playerIndex, computerIndex, scores)}</p>`);
        $(".results").append(`<p>Current scores: You: ${scores.player}; Computer: ${scores.computer}.</p>`);
    }
}

$(".play").on("click", ()=>{playGame()});