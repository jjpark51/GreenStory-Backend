import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register =(req, res) => {
// CHECK EXISTING USER

    console.log(req.body.username, req.body.email, req.body.password)

    // const q = "SELECT * FROM login WHERE email = ? OR username = ?"
    const q = "SELECT * FROM login WHERE username = ? OR email = ?"
    db.query(q, [req.body.email, req.body.username], (err, data)=> {
        if(err) return res.status(500).json(err)

        if(data.length) return res.status(409).json("User Already Exists!")

        // We don't want to save the password as it is, so we are going to use bcryptjs

    // //Hash the password and create a user
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);

    // Now we are going to insert into the database


    const q = "INSERT INTO login (username, email, password) VALUES (?)"
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ]

    console.log(values)


    // Now this is the part where it contacts the database

    db.query(q, [values], (err, data)=> {
        if(err) return res.json(err);

        return res.status(200).json("User has been added")
    })

    })
}

export const login = (req, res) => {

    //CHECK USER

    const q = "SELECT * FROM login WHERE username =?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)

        if(data.length === 0) return res.status(404).json("User not found")

        // CHECK password

        const isPasswordCorrect = req.body.password

        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password")

        //We are going to use jsonwebtoken to make sure that it is the correct user when updating or deleting posts

        const token = jwt.sign({id:data[0].id}, "jwtkey")
        const {password, ...other} = data[0]
        console.log(token)

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(data[0])

    })

}

export const username = (req, res)=> {
    const q = "SELECT * FROM login"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        //We are going to use jsonwebtoken to make sure that it is the correct user when updating or deleting posts
        return res.status(200).json(data)

    })

}

export const logout = (req, res)=> {

    console.log(req.cookies.access_token)

    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out ")
    console.log(req.cookies.access_token)
    


}