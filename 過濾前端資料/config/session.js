
import pool from '../config/db.js';
import session from "express-session";
import mySqlSession from "express-mysql-session";

const MySQLStore = mySqlSession(session);
const sessionStore = new MySQLStore({
    expiration: 10000,
	createDatabaseTable: true,
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data',
		}
	}
},pool);

 const sessionSetting = {
	secret: process.env.SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
	cookie:{
		maxAge:1000*60*5
	}
}
 

export default session(sessionSetting)