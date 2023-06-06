import path from "path";
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const isAurh = (req,res,next)=>{
    if(req.isAuthenticated()) return res.redirect('/loged')
    return res.sendFile('/loginPage.html', {root: __dirname+'/../view'});
}
const aurh = (req,res,next)=>{
    if(req.isAuthenticated()) return res.sendFile('/loginedPage.html', {root: __dirname+'/../view'});
    return res.redirect("/log");
}
const adminAurh = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.permissions === 1) return next();
    res.send({"message":"youCantDoThat"});
}

export default {
   aurh,
   isAurh,
   adminAurh
}