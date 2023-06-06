import express from "express";
import apiControllers from "../controllers/apiControllers.js";
import passport from "passport"
import aurh from "../controllers/aurh.js";
const router = express.Router();
router.post("/register",apiControllers.register)
router.post("/check",apiControllers.checkValueByFront);
router.post("/login",passport.authenticate("local"),apiControllers.login)
router.get("/logout",apiControllers.logout);
router.post("/getUserList",aurh.adminAurh,apiControllers.getAllMember)
export default router;