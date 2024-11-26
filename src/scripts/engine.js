const emojis = [
    "🥰",
    "🥰",
    "🩷",
    "🩷",
    "✨",
    "✨",
    "☁️",
    "☁️",
    "🌸",
    "🌸",
    "💖",
    "💖",
    "🤩",
    "🤩",
    "🦊",
    "🦊",
];
let openCards = [];


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function renderGame() {
    const gameDiv = document.querySelector(".game");
    gameDiv.innerHTML = "";

    const shuffledEmojis = shuffleArray([...emojis]);

    shuffledEmojis.forEach((emoji) => {
        const box = document.createElement("div");
        box.className = "item";
        box.innerHTML = emoji;
        box.onclick = handleClick;
        gameDiv.appendChild(box);
    });

    openCards = [];
}

function handleClick() {
    if(openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        showWinModal();
    }
}

function showWinModal() {
    const modal = document.getElementById("winModal");
    modal.classList.add("show");

    const closeModalButton = document.getElementById("closeModal");
    closeModalButton.onclick = () => {
        modal.classList.remove("show");
    };

    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove("show")
        }
    };
}

function resetGame() {
    const boxesOpen = document.querySelectorAll(".boxOpen, .boxMatch");
    boxesOpen.forEach(box => {
      box.classList.remove("boxOpen");
      box.classList.remove("boxMatch");
    });

    let timeout
    if(timeout) clearTimeout();
    timeout = setTimeout(() => { renderGame() }, 1000);

}

document.querySelector(".reset").addEventListener("click", resetGame);

renderGame();