let rolling = false;
let countdownStarted = false;
let timeLeft = 180;
let timerInterval;
let glitchTriggered = false;

const dice = document.getElementById("dice");

dice.addEventListener("click", () => {
    if (rolling) return;

    rolling = true;

    if (!countdownStarted) {
        startTimer();
        countdownStarted = true;
    }

    let rollInterval = setInterval(() => {
        let rand = Math.floor(Math.random() * 11) + 1;
        dice.src = rand + ".png";
    }, 100);

    setTimeout(() => {
        clearInterval(rollInterval);

        let final = Math.floor(Math.random() * 6) + 1;
        dice.src = final + ".png";

        showInstruction(final);

        rolling = false;
    }, 3000);
});

function showInstruction(num) {
    const title = document.getElementById("instruction-title");
    const body = document.getElementById("instruction-body");

    const instructions = {
        1: ["1. Be the 1st one to stamp your feet!",
            "The first one who stamp feet moves one step forward with a single-leg jump. Everyone else stays in place."],

        2: ["2. Be the 1st one to cover your eyes!",
            "The first one who covers their eyes moves one step forward with their eyes closed. Everyone else stays in place."],

        3: ["3. Be the 1st one to squat down!",
            "The first one who squat down moves one step forward with a duck walk. Everyone else stays in place."],

        4: ["4. Y’all, one step forward!",
            "All players move one step forward normally."],

        5: ["5. Y’all, one step back!",
            "All players move one step back normally."],

        6: ["6. Y’all, two steps back!",
            "All players move two steps back normally."]
    };

    title.innerText = instructions[num][0];
    body.innerText = instructions[num][1];
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        let minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        let seconds = String(timeLeft % 60).padStart(2, '0');
        document.getElementById("timer").innerText = `${minutes}:${seconds}`;

        // Halfway glitch at 90 seconds
        if (timeLeft === 90 && !glitchTriggered) {
            glitchTriggered = true;
            showGlitch();
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showLoseScreen();
        }

    }, 1000);
}

function showGlitch() {
    let glitch = document.createElement("div");
    glitch.className = "fullscreen";
    glitch.style.backgroundImage = "url('Glitch.jpg')";
    glitch.style.zIndex = "9999";

    glitch.innerHTML = `
        <div style="
            font-family: Pixel;
            font-size: 48px;
            text-align: center;
            color: white;
            text-shadow: 
                0 0 5px red,
                0 0 10px red,
                0 0 20px red,
                0 0 40px red;
        ">
            Error!
            <br><br>
            Everyone spins in place for 10 seconds!
        </div>
    `;

    document.body.appendChild(glitch);

    setTimeout(() => {
        glitch.remove();
    }, 10000);
}

function showLoseScreen() {
    document.body.innerHTML = `
        <div class="fullscreen" style="background-image:url('You-Lose.jpg')">
            <div id="playAgain">Play Again?</div>
        </div>
    `;

    document.getElementById("playAgain").onclick = () => {
        location.reload();
    };
}