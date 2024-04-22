let gameSequence = [];
let userSequence = [];
let btns = ["red", "blue", "green", "purple"];

let started = false;
let level = 0;
let highestLevel = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(){
    if(!started){
       started = true;
       levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("game-flash");
    setTimeout(function(){
        btn.classList.remove("game-flash");
    },200);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");
    },200);
}

function levelUp(){
    userSequence = []; // when level up userSequence must be empty for further check
    level++;
    h3.innerText = `Level ${level}`;
    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    gameFlash(randomBtn);
}

function checkEquality(index){
    if(gameSequence[index] === userSequence[index]){
        if(gameSequence.length === userSequence.length){
            setTimeout(levelUp, 1000);
            if (level > highestLevel) { // update highestLevel if the current level is higher
                highestLevel = level;
                document.querySelector('h2').innerText = `Highest Score: ${highestLevel}`;
            }
        }
    }else{
        h3.innerHTML = `Wrong Press! Score : <b>${level}</b><br>Press any key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    console.log(userSequence);
    checkEquality(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}