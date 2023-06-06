import base64url from "base64url";
import crypto from "crypto";
import fs from "fs";
const siginatureFunction = crypto.createSign("RSA-SHA256");
const verifyFunction = crypto.createVerify("RSA-SHA256")
const headerObj = {
    "alg": "RS256",
    "typ": "JWT"
};

const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
};

const headerObjString = JSON.stringify(headerObj);
const payloadObjString = JSON.stringify(payloadObj);

const base64UrlHeader = base64url(headerObjString);
const base64UrlPayload = base64url(payloadObjString);

siginatureFunction.write(base64UrlHeader+"."+base64UrlPayload);
siginatureFunction.end();
const priv_Key = fs.readFileSync("./privateKey.pem","utf8");
const siginatureBase64 = siginatureFunction.sign(priv_Key,"base64");
const siginatureBase64Url = base64url.fromBase64(siginatureBase64);


const JWT = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ"

const jwtParts = JWT.split(".") 

const headerInBase64UrlFormat = jwtParts[0];
const payLoadInBase64UrlFormat = jwtParts[1];
const siginatureInBase64UrlFormat = jwtParts[2];

verifyFunction.write(headerInBase64UrlFormat+"."+payLoadInBase64UrlFormat);
verifyFunction.end();
const jwtSiginaltureBase64 = base64url.toBase64(siginatureInBase64UrlFormat)
const public_Key = fs.readFileSync("./publicKey.pem","utf8");

const siginatureIsvaild = verifyFunction.verify(public_Key,jwtSiginaltureBase64,"base64")
console.log(siginatureIsvaild);

