
const data = require("./data")

function madePosition(){
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            data.latticeData.position.push([i,j]);
        }
    }
}
function getlatticePosition(){
    return data.latticeData.position
}

function changePlayerX(v){//+=
    data.playerData.x += v;
}
function changePlayerY(v){//+=
    data.playerData.y += v
}
function getPlayerSpeed(){
    return data.playerData.speed;
}
function getPlayerX(){
    return data.playerData.x;
}
function getPlayerY(){
    return data.playerData.y;
}
function setTreasureChestNum(n){
    data.treasureChestData.num = n; 
}
function random(array){
    return Math.floor(Math.random() * array.length);
}
function ifThesameFilter(){
    let rand = random(data.latticeData.position);
    let count = 0;
    for(let i in data.treasureChestData.position.latticeNum){
        if(rand === data.treasureChestData.position.latticeNum[i])count++; 
    }
    if(count>0 || rand===0) return ifThesameFilter();
    else return rand;
}
function radomChestPostition(){
    for (let i = 0;i<data.treasureChestData.num;i++){
        let num = ifThesameFilter()
         data.treasureChestData.position.latticeNum[i] = num;
         data.treasureChestData.position.position[i] = data.latticeData.position[num]
         console.log(data.treasureChestData.position.position[i]);
    } 
}
function getTreasureChestDataPosition(){
    return data.treasureChestData.position
}
module.exports = {
    madePosition,
    getlatticePosition,
    changePlayerX,
    changePlayerY,
    getPlayerSpeed,
    getPlayerX,
    getPlayerY,
    setTreasureChestNum,
    radomChestPostition,
    getTreasureChestDataPosition
}
