let imgs = ['/Dice_Images/dice_1.png',
    '/Dice_Images/dice_2.png',
    '/Dice_Images/dice_3.png',
    '/Dice_Images/dice_4.png',
    '/Dice_Images/dice_5.png',
    '/Dice_Images/dice_6.png'
];

let player1Score = 0;
let player2Score = 0;
let play1Turn = true;

// create variable to store references to the necessary DOM nodes
let dice = document.querySelectorAll("img");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const msg = document.getElementById("msg");
const msgEqual = document.getElementById("msgEqual");
const rollDiceBtn = document.getElementById("rollDiceBtn");
const resetBtn = document.getElementById("resetBtn");

//function for shake the dice
function shakeDice() {
    dice.forEach(function(dice) {
        dice.classList.add("shake");
        dice.classList.add("active");
    });
    setTimeout(function() {
            dice.forEach(function(dice) {
                dice.classList.remove("shake");
                dice.classList.remove("active");
            });
        },
        1000
    );
}

function numberGenerator() {
    const randomNumber1 = Math.floor(Math.random() * 6 + 1); //1 is added to start from 1 - 6
    const randomNumber2 = Math.floor(Math.random() * 6 + 1);

    document.querySelector("#dice1").setAttribute("src", imgs[randomNumber1 - 1]); //img starts from 0
    document.querySelector("#dice2").setAttribute("src", imgs[randomNumber2 - 1]);

    return [randomNumber1, randomNumber2] //array to return 2 values
}

function checkEqual(r1, r2) {

    console.log("check")
    let totalValue = 0;

    if (r1 === r2 && !(r1 === 1)) {
        if (play1Turn === true) {
            msg.textContent = "Player 1 another Turn";
            console.log("Play 1 random equal");
        } else if (play1Turn === false) {
            msg.textContent = "Player 2 another Turn";
            console.log("Play 2 random equal");
        } else {
            msg.textContent = "Something went wrong";
        }
        shakeDice();
        let randomN = numberGenerator()
        console.log(randomN);
        const r1 = randomN[0];
        const r2 = randomN[1];
        totalValue = r1 + r2;
        console.log("Play 2 random equal after 1 player");
    } else if (r1 === 1 && r2 === 1) {
        totalValue = 0;
        console.log("No equal value");
    }
    return totalValue;
}

function displayBtn() {
    rollDiceBtn.style.display = "none"; //hide the btn
    resetBtn.style.display = "block"; //btn is rendered as block level element(occupies the horizontal area)
}

function reset() {
    msg.textContent = "Player 1 Turn";
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Score = 0;
    player2Score = 0;
    play1Turn = true;
    resetBtn.style.display = "none";
    rollDiceBtn.style.display = "block";
}

rollDiceBtn.addEventListener("click", function() {

    let randomN = numberGenerator();
    console.log(randomN);
    const r1 = randomN[0];
    const r2 = randomN[1];
    let totalNumber = r1 + r2;
    let newTotal = 0;

    if (play1Turn) {
        //first roll
        shakeDice();
        player1Score += totalNumber;
        // console.log("ply1Score", player1Score)
        player1Scoreboard.textContent = player1Score
            //check whether the numbers are equal
        newTotal = checkEqual(r1, r2);
        player1Score += newTotal;
        player1Scoreboard.textContent = player1Score;
        // console.log("New total after random eqaul", player1Score);
        msg.textContent = "Player 2 Turn";
        // console.log("play 2 turn");

    } else {
        shakeDice();
        player2Score += totalNumber;
        player2Scoreboard.textContent = player2Score;
        // console.log("ply2Score", player2Score);
        newTotal = checkEqual(r1, r2);
        player2Score += newTotal;
        player2Scoreboard.textContent = player2Score;
        // console.log("New total after random eqaul", player2Score);
        msg.textContent = "Player 1 Turn";
        // console.log("play 1 turn");
    }


    if (player1Score >= 100) {
        msg.textContent = "Congratulations! Player 1 has won the game";
        displayBtn();

    } else if (player2Score >= 100) {
        msg.textContent = "Congratulations! Player 2 has won the game";
        displayBtn();
    }
    play1Turn = !play1Turn; //turn

    resetBtn.addEventListener("click", function() {
        reset();
    })
})