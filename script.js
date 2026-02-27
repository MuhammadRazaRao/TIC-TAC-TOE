// Select elements
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msgpara = document.querySelector(".msg");
let contactBtn = document.querySelector(".contact-btn");   // button
let contactBox = document.querySelector(".contact-box");   // popup
let themeBtn = document.querySelector(".theme");
let themeOptions = document.querySelector(".theme-options");
let themecolors = document.querySelectorAll(".theme-option");

let turnO = true;

// Winning patterns
const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Box click logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkwinner();
    });
});

// Disable all boxes
const disableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Enable all boxes
const enableboxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show winner
const showwinner = (winner) => {
    if (winner === "O") {
        msgpara.innerText = "Player O Wins!";
    } 
    else if (winner === "X") {
        msgpara.innerText = "Player X Wins!";
    } 
    else {
        msgpara.innerText = "It's a Draw!";
    }

    msgcontainer.classList.remove("hide");
    newgamebtn.style.display = "inline-block";
    disableboxes();
};

// Check winner
const checkwinner = () => {

    // Check winning patterns
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showwinner(pos1);
            return;
        }
    }

    // Check draw
    let draw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }

    if (draw) {
        showwinner("Draw");
    }
};

// Reset game
const resetgame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    newgamebtn.style.display = "none";
};

reset.addEventListener("click", resetgame);
newgamebtn.addEventListener("click", resetgame);

// ================= THEME =================

themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeOptions.classList.toggle("hide");
});

// Change theme
themecolors.forEach((option) => {
    option.addEventListener("click", () => {
        document.body.className = "";
        document.body.classList.add(option.dataset.theme);
        themeOptions.classList.add("hide");
    });
});

// ================= CONTACT =================

contactBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    contactBox.classList.toggle("hide");
});

// Close popups when clicking outside
document.addEventListener("click", (e) => {

    // Close theme
    if (!themeBtn.contains(e.target) && 
        !themeOptions.contains(e.target)) {
        themeOptions.classList.add("hide");
    }

    // Close contact
    if (!contactBtn.contains(e.target) && 
        !contactBox.contains(e.target)) {
        contactBox.classList.add("hide");
    }
});
const welcomeContainer = document.querySelector(".welcome-container");
const startBtn = document.querySelector(".start-btn");

// Hide welcome message on clicking Start Game
startBtn.addEventListener("click", () => {
    welcomeContainer.style.display = "none";
    enableboxes(); // enable the game boxes
});

// Initially, disable boxes until player starts
boxes.forEach(box => box.disabled = true);