const  express = require('express');
const app = express();
const router = express.Router();
const path = require("path")
app.use(express.json())
app.use('/', router);
app.use(express.static(path.join(__dirname)))
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
        playerData.x += v;
    }
    changePlayerY(v){//+=
        playerData.y += v
    }
    getPlayerSpeed(){
        return playerData.speed;
    }
    getPlayerX(){
        return playerData.x;
    }
    getPlayerY(){
        return playerData.y;
    };
}
let playerData = {
    id:false,
    x:0,
    y:0,
    moveState:false,
    collisionState:false,
    speed:50
};
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
function changePlayerX(v){//+=
    playerData.x += v;
};
function changePlayerY(v){//+=
    playerData.y += v
};
function getPlayerSpeed(){
    return playerData.speed;
};
function getPlayerX(){
    return playerData.x;
};
function getPlayerY(){
    return playerData.y;
};
function setTreasureChestNum(n){
    treasureChestData.num = n; 
};

router.get('/game', (req, res) => {
    res.sendFile('/front.html', {root: __dirname})
  });


router.post("/api/move",(req,res)=>{
  
    if(getPlayerY()>0){
        if(req.body.keyCode==='KeyW'){
            changePlayerY(-getPlayerSpeed());
            res.status(200).json({playerY:getPlayerY(),playerX:getPlayerX()});
        }
    }
    if(getPlayerY()<500){
        if(req.body.keyCode==='KeyS'){
            changePlayerY(getPlayerSpeed());
            res.status(200).json({playerY:getPlayerY(),playerX:getPlayerX()});
        }
    }
    if(getPlayerX()<500){
        if(req.body.keyCode==='KeyD'){
            changePlayerX(getPlayerSpeed());
            res.status(200).json({playerY:getPlayerY(),playerX:getPlayerX()});
        }
    }
    if(getPlayerX()>0){
        if(req.body.keyCode==='KeyA'){
            changePlayerX(-getPlayerSpeed());
            res.status(200).json({playerY:getPlayerY(),playerX:getPlayerX()});
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
router.post("/api/createTreasureChest",(req,res)=>{
    setTreasureChestNum(req.body.quantity);
    radomChestPostition();
    res.status(200).json(
    {text:`寶相數量設定為:${req.body.quantity}`,
     array:treasureChestData.position.position
    });
});


class bullet{
    constructor(){
        this.bulletsData ={
            position:{
            x:false,
            y:false
        },
        direction:false
    }
    
    }
    moveBulletPosition(e){
            if(e.code === "KeyD")this.bulletsData.direction = "right";
            if(e.code === "KeyA")this.bulletsData.direction = "left";
            if(e.code === "KeyW")this.bulletsData.direction = "up";
            if(e.code === "KeyS")this.bulletsData.direction = "down";
            
            if(this.bulletsData.direction==="right")this.bulletsData.position.x+=1;
            if(this.bulletsData.direction==="left")this.bulletsData.position.x-=1;
            if(this.bulletsData.direction==="up")this.bulletsData.position.y-=1;
            if(this.bulletsData.direction==="down")this.bulletsData.position.y+=1;            
    }
    
    removeBullet(){
        if(this.bulletsData.position.x<0||this.bulletsData.position.x>9||this.bulletsData.position.y<0||this.bulletsData.position.y>9){
           // this.bulletsData.el.remove();
        }
    }
    repeatBullet(e){
        if(e.code === "KeyD"||e.code === "KeyA"||e.code === "KeyW"||e.code === "KeyS"){ 
            this.collision();           
            this.moveBulletPosition(e);
            this.showBullet();
            this.removeBullet();
            if(this.bulletsData.position.x<0||this.bulletsData.position.x>9||this.bulletsData.position.y<0||this.bulletsData.position.y>9){
                return
            }
            setTimeout(()=>{
                this.repeatBullet(e)
            },200);
        }
    }


    collision(){
        
        for(let i in enemyData.position.position){
            console.log(this.bulletsData.position.x,enemyData.position.position[i][0]);
            if (this.bulletsData.position.x === enemyData.position.position[i][0]&&this.bulletsData.position.y ===enemyData.position.position[i][1]){
                enemyData.collisionState[i] =true;
                if(enemyData.collisionState[i] === true){
                    enemyData.el[i].style.backgroundImage = `url(Doge-Head.png)`;
                }
            }
        } 
        
    }
}


app.listen(3000,()=>{console.log("sever lanuch");});

