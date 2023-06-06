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
    catch(err){
        return done(err)
    }

}

const strategy = new LocalStrategy( customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser((user,done)=>{  /*可設定要將哪些 user 資訊，儲存在 Session 中的 passport.user。（如 user._id）*/
    done(null,user.id);
})

passport.deserializeUser( async (userId,done)=>{  //可藉由從 Session 中獲得的資訊去撈該 user 的資料。
    try{const [[user],_] = await post.findAllById(userId);
        done(null,user);
    }
    catch(err){
        console.log(err);
        return done;
    }
})

//視覺流程圖
/*passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
*/

export default {
   
    init:passport.initialize(),
    session:passport.session()
}