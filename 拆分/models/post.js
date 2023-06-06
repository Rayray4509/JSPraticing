import pool from '../config/db.js';
import session from "express-session";
import mySqlSession from "express-mysql-session";
const MySQLStore = mySqlSession(session);

class Post {
    constructor(name,password,e_mail,phone_number) {
        this.name = name;
        this.password = password;
        this.e_mail = e_mail;
        this.phone_number = phone_number;
    }
    saveUserData() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let h=d.getHours();
	    let m=d.getMinutes();
	    let s=d.getSeconds();
        let createAtDate = `${yyyy}-${mm}-${dd}-${h}:${m}:${s}`;
        console.log(createAtDate);
        let spl = `
        INSERT INTO userdata(name,password,e_mail,phone_number,created_at)
        VALUES(
            '${this.name}',
            '${this.password}',
            '${this.e_mail}',
            '${this.phone_number}',
            '${createAtDate}'
            
        )
        `;
        return pool.execute(spl);
    }
    static findAll() {
        let sql = "SELECT* FROM userdata;"
        return pool.execute(sql);
    }
    static findByName(name) {
        let sql = `SELECT name FROM userdata WHERE name = '${name}'; `
        return pool.execute(sql);
    }
    static findByEmail(mail) {
        let sql = `SELECT e_mail FROM userdata WHERE e_mail = '${mail}'; `
        return pool.execute(sql);
    }
    static findByPhone(phone) {
        let sql = `SELECT phone_number  FROM userdata WHERE phone_number = '${phone}'; `
        return pool.execute(sql);
    }
    static findAllByEmail(one) {
        let sql = `SELECT*  FROM userdata WHERE e_mail = '${one}'; `
        return pool.execute(sql);
    }
    
}
// let a  = pool.execute("SELECT phone_number  FROM userdata;");
// let b = async ()=> {
//     const hh = await a;
//     console.log(hh);
    
// }
// b()

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
    

export {sessionStore} 
export default Post;


