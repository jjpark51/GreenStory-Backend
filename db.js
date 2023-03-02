import mysql from "mysql2"

export const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Baseball101!",
    database: 'greenstory'

})


db.query( "SELECT * FROM login", (err, res)=> {
    if(err) return console.log(err);
    return console.log(res)
})
