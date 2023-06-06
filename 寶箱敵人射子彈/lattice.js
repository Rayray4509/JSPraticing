let latticeData = {
    position:[],
    latticeEl:[],
}
function random(array){
    return Math.floor(Math.random() * array.length);
}
function madePosition(){
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            latticeData.position.push([i,j]);
        }
    }
}
function createlatticeEl(){
    for(let i=0;i<latticeData.position.length;i++){
        let div = document.createElement("div");
        div.style.left =50*latticeData.position[i][0]+"px";
        div.style.top = 50*latticeData.position[i][1]+"px";
        div.classList.add("lattice");
        latticeData.latticeEl.push(div);
        let world = document.querySelector(".world");
        world.appendChild(div);
    }
}
function changeLatticBackground(){
    let ground = ["ground0.jpg","ground1.jpg"]
    for(let i =0;i<latticeData.latticeEl.length;i++ ){
        let grassType = random(ground)
        latticeData.latticeEl[i].style.backgroundImage = `url(${ground[grassType]})`
    }  
}
function getLatticePosition(){
    return latticeData.position;
}
function getLatticeEl(){
    return latticeData.latticeEl;
}

function initLattice(){
    madePosition();
    createlatticeEl();
    changeLatticBackground();
}

export default{
    getLatticeEl,
    getLatticePosition,
    initLattice
}