let level = 1;

let score = 5;

let curSize = 60;
let width = 300;
let height = 300;
let column = 5;
let row = 5;

let tileSize = 180;

let targetList = [];
let hitList = [];

let IsStarting = false;

let numOfTargets = 5;

let GotWrong = false;

function StartRound(){
    window.localStorage.setItem("Score", score);
    document.getElementById("btnStartRound").style.display = "none";
    document.getElementById("container-cover").style.display = "none";
    document.getElementById("score").value = score;
    IsStarting = true;
    GotWrong = false;
    setTimeout(ResetStarting, 5000)
    let container = document.getElementById("tile-container");

    let tempList = [];
    targetList = [];
    hitList = [];

    for(let i=0; i<container.childElementCount; i++){
        tempList.push(container.children[i].id);
    }

    while(targetList.length < numOfTargets){
        let curTarget = Math.floor(Math.random() * ((tempList.length-1) - 0)) + 0;
        targetList.push(tempList[curTarget]);
        tempList.splice(curTarget, 1);
    }
    
    
    targetList.forEach(function(item, index, object) {
        FlipTileRevealed(""+item);
    });
    
    setTimeout(Rotate, 3000);
}

function ResetStarting(){
    IsStarting = false;
}

function ClickTile(input){
    if(!IsStarting){
        if(targetList.includes("" + input)){
            score += 1;
            hitList.push(""+input);
            FlipTilePickedRight(input);
            targetList.splice(targetList.indexOf(""+input), 1);
        }else if(hitList.includes("" + input)){
            console.log("" + input + " has already been hit");
        }else{
            score -= 1;
            hitList.push(""+input);
            let audio = new Audio("sounds/Computer-Error-Alert.mp3");
            audio.play();
            GotWrong = true;
            FlipTilePickedWrong(input);
            if(score <= 0){
                IsStarting = true;
                window.localStorage.setItem("Score", score);
                setTimeout(Terminate, 2000);
            }
        }
        if(targetList.length == 0){
            let audio = new Audio("sounds/Electronic_Chime-KevanGC.mp3");
            audio.play();
            IsStarting = true;
            if(!GotWrong){
                let picker = Math.floor(Math.random() * (2));
                if(picker % 2==0){
                    setTimeout(AddTileLine, 2000);
                }else{
                    numOfTargets++;
                    setTimeout(ResetBoard, 1000);
                }
            }else{
                let picker = Math.floor(Math.random() * (2));
                if(picker % 2==0){
                    setTimeout(RemoveTileLine, 2000);
                }else{
                    numOfTargets--;
                    setTimeout(ShowBoard, 500);
                    setTimeout(ResetBoard, 2000);
                }
            }
            
        }
    }else{
        console.log("Round is still starting");
    }
    window.localStorage.setItem("Score", score);
    document.getElementById("score").textContent = score;
}

function Terminate(){
    document.getElementById("btnEndGame").click();
}

//Adds a column or row of columns
function AddTileLine(){
    console.log("Adding");
    let container = document.getElementById("tile-container");
    if(Math.abs(level)%2==0){
        container.style.width = width + curSize;
        width += curSize;
        for(let i=0; i<column; i++){
            let tile = document.getElementById("0").cloneNode(true);
            tile.id = container.childElementCount;
            tile.style.backgroundColor = "grey";
            tile.setAttribute("onclick", "ClickTile(" + container.childElementCount + ")");
            container.appendChild(tile);
        }
        row++;
    }
    else{
        container.style.height = height + curSize;
        height += curSize;
        for(let i=0; i<row; i++){
            let tile = document.getElementById("0").cloneNode(true);
            tile.id = container.childElementCount;
            tile.style.backgroundColor = "grey";
            tile.setAttribute("onclick", "ClickTile(" + container.childElementCount + ")");
            container.appendChild(tile);
        }
        column++;
    }
    level++;
    setTimeout(ResetBoard,1000);
}

//Adds a column or row of columns
function RemoveTileLine(){
    let container = document.getElementById("tile-container");
    if(Math.abs(level)%2==0){
        container.style.width = width - curSize;
        width -= curSize;
        for(let i=0; i<column; i++){
            container.removeChild(document.getElementById((container.childElementCount-1)));
        }
        row--;
        
        console.log("removing " + column);
    }
    else{
        container.style.height = height - curSize;
        height -= curSize;
        for(let i=0; i<row; i++){
            container.removeChild(document.getElementById((container.childElementCount-1)));
        }
        column--;
        
        console.log("removing " + row);
    }
    level--;
    setTimeout(ResetBoard,1500);
}

function ResetBoard(){
    let container = document.getElementById("tile-container");
    for(let i=0;i<container.childElementCount; i++){
        FlipTileHiddenFast(i);
    }
    setTimeout(StartRound, 1000);
}

function ShowBoard(){
    for(let i=0;i<targetList.length; i++){
        FlipTilePickedRight(targetList[i]);
    }
}

function Rotate(){
    let container = document.getElementById("tile-container");
    if(container.classList.contains("rotate1")){
        container.className = "rotate2";
    }else if(container.classList.contains("rotate2")){
        container.className = "rotate3";
    }else if(container.classList.contains("rotate3")){
        container.className = "rotate4";
    }else{
        container.className = "rotate1";
    }
}

function FlipTile1(input){
    let audio = new Audio("sounds/Card-flip-sound-effect.mp3");
    audio.play();
    document.getElementById(input).className = "tile flip1";
    setTimeout(FlipTile2, 250, input);
}
function FlipTile2(input){
    document.getElementById(input).className = "tile flip2";
    if(IsStarting){
        setTimeout(FlipTile3, 2250, input);
    }else{
        setTimeout(FlipTile3, 250, input);
    }
}
function FlipTile3(input){
    let audio = new Audio("sounds/Card-flip-sound-effect.mp3");
    audio.play();
    document.getElementById(input).className = "tile flip3";
    setTimeout(FlipTile4, 250, input);
}
function FlipTile4(input){
    document.getElementById(input).className = "tile flip4";
}

function ColorTileWrong(input){
    document.getElementById(input).style.backgroundColor = "red";
}
function ColorTileRevealed(input){
    document.getElementById(input).style.backgroundColor = "brown";
}
function ColorTileHidden(input){
    document.getElementById(input).style.backgroundColor = "grey";
}

function FlipTileWrong(input){
    FlipTile1(input);
    setTimeout(ColorTileWrong, 250, input);
    setTimeout(ColorTileHidden, 750, input);
}

function FlipTileHidden(input){
    FlipTile1(input);
    setTimeout(ColorTileHidden, 250, input);
}

function FlipTileHiddenFast(input){
    FlipTile3(input);
    setTimeout(ColorTileHidden, 250, input);
}

function FlipTileRevealed(input){
    FlipTile1(input);
    setTimeout(ColorTileRevealed, 250, input);
    setTimeout(ColorTileHidden, 2750, input);
}

function FlipTilePickedRight(input){
    FlipTile3(input);
    setTimeout(ColorTileRevealed, 250, input);
}
function FlipTilePickedWrong(input){
    FlipTile3(input);
    setTimeout(ColorTileWrong, 250, input);
}