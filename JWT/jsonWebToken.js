import jwt from "jsonwebtoken"
import fs from "fs"

const public_Key = fs.readFileSync("./publicKey.pem","utf8");
const priv_Key = fs.readFileSync("./privateKey.pem","utf8");


const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
};

const signedJWT = jwt.sign(payloadObj,priv_Key,{algorithm:"RS256"});
jwt.verify(signedJWT,public_Key,{algorithms:["RS256"]},(err,payload)=>{})