import express from "express";
import apiControllers from "../controllers/apiControllers.js";
import passport from "passport"
import aurh from "../controllers/aurh.js";
const router = express.Router();
router.post("/register",apiControllers.register);
router.post("/check",apiControllers.checkValueByFront);
router.post("/login",passport.authenticate("local"),apiControllers.login);
router.get("/logout",apiControllers.logout);
router.post("/getUserList",aurh.adminAurh,apiControllers.getAllMember);
router.post("/dist",(req,res)=>{
    console.log(req.body);
    res.status(200).json({"state":"OK"});
});
export default router;