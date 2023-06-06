import express from 'express';
import { sessionStore } from './models/post.js';
import session from "express-session";
import  postrouter  from './routes/apiRoutes.js';
import frontRouter from './routes/frontRoutes.js';
import passport from 'passport';

import "./config/passport.js"
const app = express();

app.use(session({
	secret: process.env.SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie:{
		maxAge:1000*60*5
	}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(frontRouter);
app.use("/api",postrouter);

app.use((jjj, req, res, next)=>{  
console.log("Error Handling Middleware called")
console.log('Path: ', req.path)
res.send("Error Handling Middleware called");});

app.listen(3000,()=>{
  console.log("sever lanuch");
;})


