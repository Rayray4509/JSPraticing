import latticeData from "./lattice.js";

let treasureChestData = {
    el:[],
    position:[],//第幾個晶格
    state:[]
}
function random(array){
    return Math.floor(Math.random() * array.length);
}
function createTreasureChest(){
    for(let i = 0;i<5;i++){
        let div = document.createElement("div");
        div.classList.add("box");
        treasureChestData.el.push(div)
        treasureChestData.state[i] = false;
    }
}
function treasureChestBackground(){
    for(let i in treasureChestData.state){
        if (treasureChestData.state[i]===false) {
            treasureChestData.el[i].style.backgroundImage = `url(treasureChest.png)`
        }
    }
}
function ifThesameFilter(){
    let rand = random(latticeData.getLatticeEl());
    let count = 0;
    for(let i in treasureChestData.position){
        if(rand === treasureChestData.position[i])count++; 
    }
    if(count>0 || rand===0) return ifThesameFilter(latticeData.getLatticeEl());
    else return rand;
}
function radomChestPostition(){
    for (let i = 0;i<5;i++){
        let rand = random(latticeData.getLatticeEl());//隨機第幾個晶格
        treasureChestData.position[i] = ifThesameFilter();
    } 
    console.log(treasureChestData.position);
   
}
function appendChest(){
    treasureChestData.position.forEach((value,key)=>{  
       latticeData.getLatticeEl()[value].appendChild(treasureChestData.el[key]);
    })      
}
function openChest(i){
    treasureChestData.el[i].style.backgroundImage = `url(treasureChestOpen.png)`
}

function initTreasureChest(){
    createTreasureChest();
    treasureChestBackground();
    radomChestPostition();
    appendChest()
}
function getTreasureChestPosition(){
    return treasureChestData.position;
}
function getTreasureChestState(){
    return treasureChestData.state;
}
function changeTreasureChestState(i,state){
    treasureChestData.state[i] = state;
}

export default{
    initTreasureChest,
    appendChest,
    openChest,
    getTreasureChestPosition,
    getTreasureChestState,
    changeTreasureChestState
}