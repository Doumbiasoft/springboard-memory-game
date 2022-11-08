const cards = document.querySelectorAll("#game .card");
const divGame = document.querySelector("#divGame");
const divStartgame = document.querySelector("#divStartgame");
const divGameover = document.querySelector("#divGameover");
const btReset = document.querySelector("#btReset");
const bestScoreText = document.querySelector("#LastBestScore");
const finalScore = document.querySelector("#finalScore");
const scoretext = document.querySelector("#Score");

let IsFlipped = false;
let lock = false;
let firstCard, secondCard;
let matchedCard = 0;
let score = 0;
let lowScore = localStorage.getItem("lowScore");

if (lowScore) {
  bestScoreText.innerText = lowScore;
}
shuffle();
btStart.addEventListener("click", () => {
  divGame.classList.remove("hide");
  divStartgame.classList.add("hide");
});
btReset.addEventListener("click", () => {
  window.location.reload();
});
function flipCard() {
  if (lock) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  score++;
  scoretext.innerText = score;

  if (!IsFlipped) {
    IsFlipped = true;
    firstCard = this;
    return;
  }
  document.getElementById("Score").innerText = score;
  secondCard = this;
  lock = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.type === secondCard.dataset.type;
  isMatch ? disableCards() : unflipCards();
  addChake();
}
function addChake() {
  setTimeout(() => {
    firstCard.classList.add("shake");
    secondCard.classList.add("shake");
  }, 400);
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedCard += 2;
  if (matchedCard === cards.length) {
    divGameover.classList.remove("hide");
    setTimeout(() => {
      divGame.classList.add("hide");
      divStartgame.classList.add("hide");
    }, 3000);

    let lowScore = +localStorage.getItem("lowScore") || Infinity;
    if (score < lowScore) {
      finalScore.innerText = score + " - NEW BEST SCORE!!";
      localStorage.setItem("lowScore", score);
    }
  }
  if (!lowScore) {
    finalScore.innerText = score + " - NEW BEST SCORE!!";
  } else {
    finalScore.innerText = score;
  }

  document.getElementById("Score").innerText = score;
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip", "shake");
    secondCard.classList.remove("flip", "shake");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [IsFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let ramdomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = ramdomIndex;
  });
}
cards.forEach((card) => card.addEventListener("click", flipCard));
