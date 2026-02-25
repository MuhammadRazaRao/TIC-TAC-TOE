let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msgpara = document.querySelector(".msg");
let mode = document.querySelector(".mode");

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
    if(winner === "O"){
        msgpara.innerText = "Player O Wins!";
    }
    else if(winner === "X"){
        msgpara.innerText = "Player X Wins!";
    }
    else if(winner === "Draw"){
        msgpara.innerText = "It's a Draw!";
    }


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
    
    let draw = true;
        for(let box of boxes){
            if(box.innerText === ""){
                draw = false;
                break;

        }
        }
        if(draw){
            showwinner("Draw");
        }
    }

};

const resetgame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
    newgamebtn.style.display = "none";
};

mode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = mode.querySelector("i"); // select the <i> inside .mode
    if (document.body.classList.contains("dark-mode")) {
        // Dark mode is active → show sun
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        // Light mode is active → show moon
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});