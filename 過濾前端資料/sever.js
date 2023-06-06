import express from 'express';
import  postrouter  from './routes/apiRoutes.js';
import frontRouter from './routes/frontRoutes.js';
import passport from 'passport';
import cookies from "cookie-parser";
import session from './config/session.js';

const app = express();
app.use(cookies());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(frontRouter);
app.use("/api",postrouter);
app.listen(3000,()=>{
  console.log("sever lanuch");
;})


