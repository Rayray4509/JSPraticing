const  express = require('express');
const app = express();
const router = express.Router();
app.use(express.json())


router.get('/', (req, res) => {
  res.send('public')
});

router.get('/public', (req, res) => {
  res.sendFile('/public/views/index.html', {root: __dirname})
});

router.get('/contact', (req, res) => {
  res.sendFile('/public/views/contact.html', {root: __dirname})
});

router.get('/about',(req, res) =>{
  res.sendFile('/public/views/about.html', {root: __dirname })
});

router.get('/severTime',(req, res) =>{
    let date = Date.parse(new Date()) 
    res.json({time:date});
});

router.post("/severTime",(req,res)=>{
  console.log(req.body);
  res.status(200).json("3");
})


app.use('/', router);
app.listen(3000,()=>{});




  