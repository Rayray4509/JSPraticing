import passport from "passport"
import {Strategy as LocalStrategy}  from "passport-local"
import post from "../models/post.js"
import psUntils from "../lib/passwordUtils.js"

const customFields = {
    usernameField: 'e_mail',
    passwordField: 'password',
}
const verifyCallback = async (e_mail,password,done)=> {

try{
    const [[user],_] = await post.findAllByEmail(e_mail);
    if(!user) {return done(null,false);}
    const isValid = psUntils.validPassword(password,user.password,user.salt);
    if(isValid) {return done(null,user);}
    done(null,false);
}
catch(err){return done(err)};

}
const strategy = new LocalStrategy( customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser( async (userId,done)=>{
    try{const [[user],_] = await post.findAllById(userId);
        done(null,user);
    }
    catch(err){console.log(err);return done;}
    
})