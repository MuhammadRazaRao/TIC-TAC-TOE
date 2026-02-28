// ================= SELECT ELEMENTS =================
const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const newgamebtn = document.querySelector(".new-btn");
const msgcontainer = document.querySelector(".msg-container");
const msgpara = document.querySelector(".msg");
const turnIndicator = document.querySelector(".turn-indicator");

const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const singlePlayerNameInput = document.getElementById("player-name");

const playerModeBtn = document.querySelector(".player-mode");
const aiModeBtn = document.querySelector(".ai-mode");
const welcomeBox = document.querySelector(".welcome-msg");
const playersSection = document.querySelector(".players-section");
const backBtn = document.querySelector(".back-btn");
const startBtn = document.querySelector(".start-btn");
const welcomeContainer = document.querySelector(".welcome-container");

const homeBtn = document.querySelector(".home");
// ================= THEME =================
const themeBtn = document.querySelector(".theme");
const themeOptions = document.querySelector(".theme-options");
const themecolors = document.querySelectorAll(".theme-option");

themeBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  themeOptions?.classList.toggle("hide");
});

themecolors.forEach(option => {
  option.addEventListener("click", () => {
    document.body.className = option.dataset.theme;
    themeOptions?.classList.add("hide");
  });
});

// ================= CONTACT =================
const contactBtn = document.querySelector(".contact-btn");
const contactBox = document.querySelector(".contact-box");

contactBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  contactBox?.classList.toggle("hide");
});

// ================= OUTSIDE CLICK CLOSE =================
document.addEventListener("click", (e) => {
  if(themeBtn && themeOptions){
    if(!themeBtn.contains(e.target) && !themeOptions.contains(e.target)){
      themeOptions.classList.add("hide");
    }
  }

  if(contactBtn && contactBox){
    if(!contactBtn.contains(e.target) && !contactBox.contains(e.target)){
      contactBox.classList.add("hide");
    }
  }
});

// ================= GAME STATE =================
let turnO = false; 
let player1Name = "Player X";
let player2Name = "Player O";
let isSinglePlayer = false;

// ================= WIN PATTERNS =================
const winpatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

// ================= ENABLE / DISABLE =================
const enableboxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win");
  });
};

const disableboxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// ================= SHOW WINNER =================
function showwinner(winner){
  if(winner === "X"){
    msgpara.innerText = `${player1Name} Wins!`;
  } 
  else if(winner === "O"){
    msgpara.innerText = `${player2Name} Wins!`;
  } 
  else {
    msgpara.innerText = "It's a Draw!";
  }

  msgcontainer.classList.remove("hide");
  turnIndicator.innerText = msgpara.innerText;
  disableboxes();
}

// ================= CHECK WINNER =================
function checkwinner(){
  for(let pattern of winpatterns){
    let [a,b,c] = pattern;

    if(
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ){
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");

      showwinner(boxes[a].innerText);
      return true;
    }
  }

  // Draw check
  let isDraw = [...boxes].every(box => box.innerText !== "");
  if(isDraw){
    showwinner("draw");
    return true;
  }

  return false;
}

// ================= RESET =================
function resetgame(){
  turnO = false;
  enableboxes();
  msgcontainer.classList.add("hide");
  updateTurnIndicator();
}

reset?.addEventListener("click", resetgame);
newgamebtn?.addEventListener("click", resetgame);

// ================= MODE SWITCH =================
playerModeBtn?.addEventListener("click", () => {
  welcomeBox.classList.add("hide");
  playersSection.classList.remove("hide");
});

backBtn?.addEventListener("click", () => {
  playersSection.classList.add("hide");
  welcomeBox.classList.remove("hide");
});

aiModeBtn?.addEventListener("click", () => {
  isSinglePlayer = true;
  player1Name = "Player";
  player2Name = "AI Bot";

  welcomeContainer.style.display = "none";
  enableboxes();
  updateTurnIndicator();
});

// ================= START BUTTON =================
startBtn?.addEventListener("click", () => {

  if(singlePlayerNameInput && singlePlayerNameInput.value.trim() !== ""){
    isSinglePlayer = true;
    player1Name = singlePlayerNameInput.value.trim();
    player2Name = "AI Bot";
  } 
  else {
    isSinglePlayer = false;
    player1Name = player1NameInput?.value.trim() || "Player X";
    player2Name = player2NameInput?.value.trim() || "Player O";
  }

  welcomeContainer.style.display = "none";
  enableboxes();
  turnO = false;
  updateTurnIndicator();
});

// ================= PLAYER CLICK =================
boxes.forEach(box => {
  box.addEventListener("click", () => {

    if(box.innerText !== "") return;

    if(!isSinglePlayer){
      box.innerText = turnO ? "O" : "X";
      box.disabled = true;

      if(checkwinner()) return;

      turnO = !turnO;
      updateTurnIndicator();
    }
    else {
      if(turnO) return;

      box.innerText = "X";
      box.disabled = true;

      if(checkwinner()) return;

      turnO = true;
      updateTurnIndicator();

      setTimeout(() => {
        aiMove();
      }, 400);
    }
  });
});

// ================= AI MOVE =================
function aiMove(){
  if(!turnO) return;

  // Try win
  for(let pattern of winpatterns){
    let values = pattern.map(i => boxes[i].innerText);
    if(values.filter(v => v === "O").length === 2 && values.includes("")){
      let index = pattern[values.indexOf("")];
      boxes[index].innerText = "O";
      boxes[index].disabled = true;
      checkwinner();
      turnO = false;
      updateTurnIndicator();
      return;
    }
  }

  // Block
  for(let pattern of winpatterns){
    let values = pattern.map(i => boxes[i].innerText);
    if(values.filter(v => v === "X").length === 2 && values.includes("")){
      let index = pattern[values.indexOf("")];
      boxes[index].innerText = "O";
      boxes[index].disabled = true;
      checkwinner();
      turnO = false;
      updateTurnIndicator();
      return;
    }
  }

  // Center
  if(boxes[4].innerText === ""){
    boxes[4].innerText = "O";
    boxes[4].disabled = true;
  }
  else {
    let empty = [...boxes].filter(box => box.innerText === "");
    let random = empty[Math.floor(Math.random() * empty.length)];
    random.innerText = "O";
    random.disabled = true;
  }

  checkwinner();
  turnO = false;
  updateTurnIndicator();
}

// ================= TURN INDICATOR =================
function updateTurnIndicator(){
  if(isSinglePlayer){
    turnIndicator.innerText = turnO 
      ? "Turn: AI (O)" 
      : `Turn: ${player1Name} (X)`;
  } 
  else {
    turnIndicator.innerText = turnO 
      ? `Turn: ${player2Name} (O)` 
      : `Turn: ${player1Name} (X)`;
  }
}

// ================= HOME =================
homeBtn?.addEventListener("click", () => {
  welcomeContainer.style.display = "flex";
  resetgame();
});

// ================= LOADING SCREEN =================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loading-screen");

  setTimeout(() => {
    if(loader) loader.style.display = "none";
    if(welcomeContainer) welcomeContainer.style.display = "flex";
    disableboxes();
  }, 2000);
});