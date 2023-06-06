import crypto from "crypto";

const genPassword = (password)=>{
    let salt = crypto.randomBytes(32).toString("hex");
    let genHash = crypto.pbkdf2Sync(password,salt,1000,64,"sha512").toString("hex");
    return {
        salt:salt,
        hash:genHash
    }

}
const validPassword = (password,hash,salt)=>{
    let hashValify = crypto.pbkdf2Sync(password,salt,1000,64,"sha512").toString("hex");
    return hash === hashValify;
}





export default {
    genPassword,
    validPassword,
}