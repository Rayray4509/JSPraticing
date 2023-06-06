function createElement(){
    let div = document.createElement("div");
    return div;
}
function createMoreElement(num){
    let elList = [];
    for(let i = 0; i <num; i++){
        elList[i] = null;
    }
    elList.forEach((value,key)=>{
        let div = document.createElement("div");
        elList[key] = div;
    })
    return elList
}
function classSet(div,name){
    div.classList.add(name)
}
function appendEl(div,world){
    world.appendChild(div)
}
function removeEl(div,world){
    world.removeChild(div);
}
function showElment(div,x,y){
    div.style.top = x+"px";
    div.style.left = y+"px";
}
function setWidthHeight(div,w,h){
    console.log(div);
    div.style.width = w + "px";
    div.style.height = h +"px";
}
function setBackGroundColor(div,color){
    div.style.backgroundColor = color
}
function setBackGroundImage(div,image){
    div.style.backgroundImage = image;
}
function setPosition(div,p){
    div.style.position = p;
}
export default{
    createElement,
    appendEl,
    removeEl,
    createMoreElement,
    createElement,
    showElment,
    classSet,
    setWidthHeight,
    setBackGroundColor,
    setBackGroundImage,
    setPosition
}