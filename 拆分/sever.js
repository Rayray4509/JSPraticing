import express from 'express';
import { sessionStore } from './models/post.js';
import session from "express-session";
import  postrouter  from './routes/postRoutes.js';
import frontRouter from './routes/frontRoutes.js';
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



app.use(express.json());
app.use(frontRouter);
app.use("/api",postrouter);
app.listen(3000,()=>{
  console.log("sever lanuch");
;})


