import {config} from 'dotenv'
import mysql2 from 'mysql2'
config();


let pool = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

pool.connect((error)=>{
    if(error)throw error
    else console.log("connect to mysql successfully");
})


export default pool.promise();


