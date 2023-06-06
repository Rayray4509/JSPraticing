import data from "../data.js";
function getX(){
    let value = data.x
    return value;
}
function getY(){
    let value = data.y
    return value;
}
function setX(value){
    data.x = value;
    console.log(data.x);
}
function setY(value){
    data.y = value;
    console.log(data.y);
}
function increaseX(value){
    data.x += value;
}
function decreaseX(value){
    data.x -= value;
}
function increaseY(value){
    data.y += value;
}
function decreaseY(value){
    data.y -= value;
}

export default {
    getX,
    getY,
    setX,
    setY,
    decreaseX,
    decreaseY,
    increaseX,
    increaseY
}

