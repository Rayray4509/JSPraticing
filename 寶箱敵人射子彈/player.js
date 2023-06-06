import latticeData from "./lattice.js";
let playerData = {
    playerEl:false,
    x:false,
    y:false,
    moveState:false,
}

function createPlayerEl(){
    let elPlayer = document.createElement("div");
    playerData.playerEl = elPlayer;
    elPlayer.classList.add("player");
    let world = document.querySelector(".world");
    world.appendChild(elPlayer);
}
function cgangePlayerXY(i){
    playerData.x = latticeData.getLatticePosition()[i][0];
    playerData.y = latticeData.getLatticePosition()[i][1];
}
function initPlayerPosition(){
    playerData.playerEl.style.left = 0+"px";
    playerData.playerEl.style.top = 0+"px";
}
function showPlayer(){
    playerData.playerEl.style.left =playerData.x*50+"px"
    playerData.playerEl.style.top =playerData.y*50+"px"
}
function getPlayerMoveState(){
    return playerData.moveState;
}
function initPlayer(){
    createPlayerEl();
    initPlayerPosition();
}
function changePlayMoveState(state){
    playerData.moveState = state;
}

export default{
    initPlayerPosition,
    showPlayer,
    initPlayer,
    cgangePlayerXY,
    getPlayerMoveState,
    changePlayMoveState
}