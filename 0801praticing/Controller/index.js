import model from "../Model/index.js";
import view from "../View/index.js";

function arrowUp(){
    console.log("上");
    model.decreaseY(50);
}
function arrowDown(){
    console.log("下");
    model.increaseY(50);
}
function arrowLeft(){
    console.log("左");
    model.decreaseX(50);
}
function arrowRight(){
    console.log("右");
    model.increaseX(50);
}
function getX(){
    return model.getX();
}
function getY(){
    return model.getY();
}
let world = view.createElement();
function worldSet(){
view.classSet(world,".world");
view.setWidthHeight(world,500,500);
view.appendEl(world,document.body);
view.setBackGroundColor(world,"gray");
view.setPosition(world,"absolute")
}

let player = view.createElement();
function playerSet(image){  
view.classSet(player,".player");
view.setWidthHeight(player,50,50);
view.appendEl(player,world);
view.setBackGroundColor(player,"pink");
view.setBackGroundImage(player,image)
view.setPosition(player,"absolute")
}

function showElment(){
    view.showElment(player,model.getY(),model.getX())
}
export default {
arrowUp,
arrowDown,
arrowLeft,
arrowRight,
getX,
getY,
worldSet,
playerSet,
showElment

}
