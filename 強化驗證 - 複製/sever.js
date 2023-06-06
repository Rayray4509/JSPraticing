import express from 'express';
import  postrouter  from './routes/apiRoutes.js';
import frontRouter from './routes/frontRoutes.js';
import session from './config/session.js';
import passport from './config/passport.js';
import path from "path";
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static('./',{root: __dirname+'./dist'}));
app.use(session);
app.use(passport.init);
app.use(passport.session);
app.use(express.json());
app.use(frontRouter);
app.use("/api",postrouter);
app.listen(3000,()=>{
  console.log("sever lanuch");
;})


