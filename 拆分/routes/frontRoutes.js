import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import postControllers from "../controllers/postControllers.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const router = express.Router();
app.use(express.json())
app.use(express.static(path.join(__dirname)))

router.get('/', (req, res) => res.redirect(302,"/log"));
router.get('/reg', (req, res) => {
    res.sendFile('/register.html', {root: __dirname+'/../view'})
});
router.get('/log', postControllers.isAurh,(req, res) => {
    res.sendFile('/loginPage.html', {root: __dirname+'/../view'})
});

router.get('/loged', postControllers.isAurh,(req, res) => {
    res.redirect('log');
});
export default router;


