import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import aurh from "../controllers/aurh.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();


router.get('/', (req, res) => res.redirect(302,"/log"));
router.get('/reg', (req, res) => {
    res.sendFile('/register.html', {root: __dirname+'/../view'})
});
router.get('/log',aurh.isAurh);
router.get('/loged',aurh.aurh);
router.get('/test',aurh.adminAurh,(req, res) => {
    res.sendFile('/admin.html', {root: __dirname+'/../view'})
});
export default router;


