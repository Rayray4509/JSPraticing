import Post from "../models/post.js";
import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import bcrypt from "bcrypt"
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname)))

const getAllPosts = async (req,res,next)=>{
    try {
        const [post,_] = await(Post.findAll())
        res.status(200).json({post});

    } catch (error) {
        console.log(error);
        next(error);
    }
}
const register = async (req,res)=>{
  try {
      let {name,password,e_mail,phone_number} = req.body;
      const hashedPsw = await bcrypt.hash(password,12) ;
      let post =  new Post(name,hashedPsw,e_mail,phone_number);
      post =  await(post.saveUserData());
      res.redirect(302,"/log");
      
  } catch (err) {
    res.redirect(302,"/reg");
  }
}
function whiteSpace(w) {
    let array = Array.from(w)
    let count = 0
    for (let i of array){
        if(i.indexOf(" ") >= 0||i.indexOf(`'`)>=0||i.indexOf(`"`)>=0||i.indexOf("`")>=0||i.indexOf("/")>=0)
         count++;
    }
    
    return count;
  }
const isAurh = (req,res,next)=>{
    if(req.session.name){
        console.log( req.session.name);
        res.sendFile('/loginedPage.html', {root: __dirname+'/../view'})
    }else {
        next();
        
    }

}

const firstCheck =  (value,res)=>{
    console.log(value);
    if(whiteSpace(value)>0){
        res.status(200).json({"data":"exist"});
        return false;
    }
    let x = value.trim();
    if(x) return true;
    else {
        res.status(200).json({"data":"exist"});
        return false;
    }
}
let  allCheck = async (findBy,value,res)=>{
    let result = firstCheck(value,res);
    try{
        if (result == true){ 
            const [[post],_] = await findBy(value);
            if(post){res.status(200).json({"data":"exist"})
            }else {res.status(200).json({"data":"OK"})}
        }
    }catch(err){
        res.status(200).json({"data":"exist"});
    }

}


const checkGetPostByFront = async (req,res)=>{
    try{
        let  {id,value} = req.body;
        if (id==3) await allCheck(Post.findByPhone,value,res);
        if (id==2) await allCheck(Post.findByEmail,value,res);
        if (id==0) await allCheck(Post.findByName,value,res);
        if(id==1) firstCheck(value,res);
        if(id==11){
            let array =JSON.parse(value)
            console.log(array);
            let newArray = array.map(x=>x.trim())
            for(let i in array){
                if(whiteSpace(array[i])>0){
                    res.status(200).json({"data":"exist"})
                    break;
                }
            }
        if(newArray.every(v=>v)===false)res.status(200).json({"data":"exist"})
            else res.status(200).json({"data":"OK"});
        }
    }   
    catch (err) {
        res.status(200).json({"data":"exist"});
    }
}
const login = async (req,res)=>{
    let  {e_mail,password} = req.body;
    const [[user],_] = await Post.findAllByEmail(e_mail);
    if(!user){
        return res.status(200).json({"data":"notExist"});
    }else{
        const isMatch = await bcrypt.compare(password,user.password)
        console.log(isMatch);
        if(!isMatch){
            return res.status(200).json({"data":"notExist"});
        }
            req.session.name = e_mail;
            res.redirect(302,"/loged");
        
    }
    
}
const logout = (req,res)=>{
    req.session.destroy((err)=>{
        if (err)  throw err;
        res.redirect("/log")
    })
}





export default {
    getAllPosts,
    register,
    checkGetPostByFront,
    login,
    isAurh,
    logout
}