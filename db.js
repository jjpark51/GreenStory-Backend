import mysql from "mysql2"
import fs from 'fs'

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);


export const db = mysql.createPool({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database

})


db.query( "SELECT * FROM login", (err, res)=> {
    if(err) return console.log(err);
    return console.log(res)
})
