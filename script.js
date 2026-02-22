let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msgpara = document.querySelector(".msg");

let turnO = true;

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

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
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

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showwinner = (winner) => {
    msgpara.innerText = `The winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    newgamebtn.style.display = "inline-block";
    disableboxes();
};

const checkwinner = () => {
    for(let pattern of winpatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos1 === pos2 && pos2 === pos3){
            showwinner(pos1);
        }
    }
};

const resetgame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    newgamebtn.style.display = "none";
};

newgamebtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);