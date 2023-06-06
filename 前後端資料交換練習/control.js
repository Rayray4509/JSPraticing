const model = require("./model")
const  express = require('express');
const app = express();
const router = express.Router();
const path = require("path")
app.use(express.json())
app.use('/', router);
app.use(express.static(path.join(__dirname)))
router.get('/game', (req, res) => {
    res.sendFile('/front.html', {root: __dirname})
  });
router.post("/api/move",(req,res)=>{
    if(model.getPlayerY()>0){
        if(req.body.keyCode==='KeyW'){
            model.changePlayerY(-model.getPlayerSpeed());
            res.status(200).json({playerY:model.getPlayerY(),playerX:model.getPlayerX()});
        }
    }
    if(model.getPlayerY()<500){
        if(req.body.keyCode==='KeyS'){
            model.changePlayerY(model.getPlayerSpeed());
            res.status(200).json({playerY:model.getPlayerY(),playerX:model.getPlayerX()});
        }
    }
    if(model.getPlayerX()<500){
        if(req.body.keyCode==='KeyD'){
            model.changePlayerX(model.getPlayerSpeed());
            res.status(200).json({playerY:model.getPlayerY(),playerX:model.getPlayerX()});
        }
    }
    if(model.getPlayerX()>0){
        if(req.body.keyCode==='KeyA'){
            model.changePlayerX(-model.getPlayerSpeed());
            res.status(200).json({playerY:model.getPlayerY(),playerX:model.getPlayerX()});
        }
    } 
})

model.madePosition();
router.post("/api/position",(req,res)=>{
    res.status(200).json(model.getlatticePosition());
})
router.post("/api/createTreasureChest",(req,res)=>{
    model.setTreasureChestNum(req.body.quantity);
    model.radomChestPostition();
    res.status(200).json(
    {text:`寶相數量設定為:${req.body.quantity}`,
     array:model.getTreasureChestDataPosition().position
    });
})
app.listen(3000,()=>{console.log("sever lanuch");});

