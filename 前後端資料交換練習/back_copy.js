
const  express = require('express');
const app = express();
const router = express.Router();
const path = require("path")
app.use(express.json())
app.use('/', router);
app.use(express.static(path.join(__dirname)))
let userId = [];
let isNewPlayer = false
class player{
    constructor(){
        this.playerData = {
            id:false,
            x:0,
            y:0,
            moveState:false,
            collisionState:false,
            speed:50
        }
    }
    changePlayerX(v){//+=
        this.playerData.x += v;
    }
    changePlayerY(v){//+=
        this.playerData.y += v
    }
    getPlayerSpeed(){
        return this.playerData.speed;
    }
    getPlayerX(){
        return this.playerData.x;
    }
    getPlayerY(){
        return this.playerData.y;
    };
    setPlayerId(input){
        this.playerData.id = input
    }
    getPlayerId(){
        return this.PlayData.id.name
    }
}

let latticeData = {
    position:[]
};
let treasureChestData = {
    num:0,
    position:{
        latticeNum:[],
        position:[]
    },
    state:[]
};
function madePosition(){
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            latticeData.position.push([i,j]);
        }
    }
};
function getPosition(){
    return latticeData.position
};
function setTreasureChestNum(n){
    treasureChestData.num = n; 
};

router.get('/game', (req, res) => {
    res.sendFile('/front_copy.html', {root: __dirname})
  });
let count = 0;
router.post("/api/setPlayer",(req,res)=>{
    console.log(req.body.player+" join this game!");
    isNewPlayer = true;
    let playerId = req.body.playerId;
    playerId = new player;
    userId.push({
        name:req.body.player,
        backId:count,
        move:playerId
    });
    playerId.setPlayerId(req.body.playerId);
    res.status(200).json(userId[count].name);
    count++;
})
router.post("/api/decatePlayer",(req,res)=>{
    res.status(200).json({text:userId[count-1].name});
})

let xyData = [] 
router.post("/api/move",(req,res)=>{
    console.log(req.body);
    let moveClass = false
    for(let i in userId){
        if(userId[i].name === req.body.playerId) moveClass = userId[i].move;
    }
    if(moveClass.getPlayerY()>0){
        if(req.body.keyCode==='KeyW'){
            moveClass.changePlayerY(-moveClass.getPlayerSpeed());
            for(let i in userId){xyData[i] = [userId[i].move.getPlayerX(),userId[i].move.getPlayerY()]}
            res.status(200).json(xyData);
        }
    }
    if(moveClass.getPlayerY()<500){
        if(req.body.keyCode==='KeyS'){
            moveClass.changePlayerY(moveClass.getPlayerSpeed());
            for(let i in userId){xyData[i] = [userId[i].move.getPlayerX(),userId[i].move.getPlayerY()]}
            res.status(200).json(xyData);
        }
    }
    if(moveClass.getPlayerX()<500){
        if(req.body.keyCode==='KeyD'){
            moveClass.changePlayerX(moveClass.getPlayerSpeed());
            for(let i in userId){xyData[i] = [userId[i].move.getPlayerX(),userId[i].move.getPlayerY()]}
            res.status(200).json(xyData);
        }
    }
    if(moveClass.getPlayerX()>0){
        if(req.body.keyCode==='KeyA'){
            moveClass.changePlayerX(-moveClass.getPlayerSpeed());
            for(let i in userId){xyData[i] = [userId[i].move.getPlayerX(),userId[i].move.getPlayerY()]}
            res.status(200).json(xyData);
        }
    }
    
});
function random(array){
    return Math.floor(Math.random() * array.length);
};
function ifThesameFilter(){
    let rand = random(latticeData.position);
    let count = 0;
    for(let i in treasureChestData.position.latticeNum){
        if(rand === treasureChestData.position.latticeNum[i])count++; 
    }
    if(count>0 || rand===0) return ifThesameFilter();
    else return rand;
};
function radomChestPostition(){
    for (let i = 0;i<treasureChestData.num;i++){
        let num = ifThesameFilter()
         treasureChestData.position.latticeNum[i] = num;
         treasureChestData.position.position[i] = latticeData.position[num]
         console.log(treasureChestData.position.position[i]);
    } 
};



madePosition();
router.post("/api/position",(req,res)=>{
    res.status(200).json(getPosition());
});

router.post("/api/updatePlayer",(req,res)=>{
    res.status(200).json({length:userId.length,position:xyData});
});
let createdChest = false;
router.post("/api/createTreasureChest",(req,res)=>{
    if (createdChest === true){
        res.status(200).json({
            createdChest:true,
            text:`寶相數量設定為:${req.body.quantity}`,
            array:treasureChestData.position.position
            });
        return;
    }
    setTreasureChestNum(req.body.quantity);
    radomChestPostition();
    res.status(200).json(
    {text:`寶相數量設定為:${req.body.quantity}`,
     array:treasureChestData.position.position
    });
    createdChest = true;
});



app.listen(3000,()=>{console.log("sever lanuch on:"+"http://192.168.50.76:3000/game");});

