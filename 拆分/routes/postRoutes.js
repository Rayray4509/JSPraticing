import express from "express";
import postControllers from "../controllers/postControllers.js";
const app = express();
const router = express.Router();


router.route("/register").post(postControllers.register)
router.route("/check").post(postControllers.checkGetPostByFront);
router.route("/login").post(postControllers.login);
router.route("/logout").get(postControllers.logout);




export default router;