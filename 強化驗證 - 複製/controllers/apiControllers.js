import psUntils from "../lib/passwordUtils.js";
import Post from "../models/post.js";
import sendMail from "../config/mail.js";
import random from "../lib/random.js";




const getAllMember = async (req,res,next)=>{
    try {
        const [post,_] = await(Post.findAll())
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const sendVerifiedEmail = async (req,res,next)=>{
    try{
        console.log(req.body.e_mail);
        const randomID = random();
        const result = await sendMail(randomID,req.body.e_mail)
        console.log(result);
        next()
    }catch (err) {
        console.log(err);
        res.send("請重試");
    }
}
const promise = new Promise((rs,rj)=>{
    

})
// const verifyEmail = (req,res,next)=>{
//     try {
//         if (req.params.id === ) {
            
//         }
        
//     } catch (error) {
        
//     }
// }

const register = async (req,res)=>{
  try {
    const {name,password,e_mail,phone_number} = req.body;
    const saltHash = psUntils.genPassword(password);
    const {salt,hash} = saltHash
    const post =  new Post(name,hash,salt,e_mail,phone_number,0);
    await(post.saveUserData());
    res.redirect(302,"/log");      
  } catch (err) {
    res.redirect(302,"/reg");
  }
}
function whiteSpace(w) {
    const array = Array.from(w)
    const count = 0
    for (let i of array){
        if(i.indexOf(" ") >= 0||i.indexOf(`'`)>=0||i.indexOf(`"`)>=0||i.indexOf("`")>=0||i.indexOf("/")>=0)
         count++;
    }
    
    return count;
  }


const firstCheck =  (value,res)=>{
    
    if(whiteSpace(value)>0){
        res.status(200).json({"data":"exist"});
        return false;
    }
    const x = value.trim();
    if(x) return true;
    res.status(200).json({"data":"exist"});
    return false;
    
}
let allCheck = async (findBy,value,res)=>{
    const result = firstCheck(value,res);
    try{
        if (result == true){ 
            const [[post],_] = await findBy(value);
            if(post) return res.status(200).json({"data":"exist"})
            res.status(200).json({"data":"OK"})
        }
    }catch(err){
        res.status(200).json({"data":"exist"});
    }

}


const checkValueByFront = async (req,res)=>{
    try{
        const  {id,value} = req.body;
        if (id==3) await allCheck(Post.findByPhone,value,res);
        if (id==2) await allCheck(Post.findByEmail,value,res);
        if (id==0) await allCheck(Post.findByName,value,res);
        if(id==1) firstCheck(value,res);
        if(id==11){
            let array =JSON.parse(value)
           
            let newArray = array.map(x=>x.trim())
            for(let i in array){
                if(whiteSpace(array[i])>0){
                    res.status(200).json({"data":"exist"})
                    break;
                }
            }
            if(newArray.every(v=>v)===false) return res.status(200).json({"data":"exist"})
            res.status(200).json({"data":"OK"});
        }
    }   
    catch (err) {
        res.status(200).json({"data":"exist"});
    }
}
const login = (req,res)=>{
    if (req.user) return res.redirect("/loged")
    res.status(401).json({"err":"err"});
   };

const logout = (req,res)=>{
    req.session.destroy((err)=>{
        if (err) return next(err);
        res.redirect('/');
    })
}






export default {
    getAllMember,
    register,
    checkValueByFront,
    logout,
    login,
    sendVerifiedEmail
}