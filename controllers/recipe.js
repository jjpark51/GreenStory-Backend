import jwt from 'jsonwebtoken'
import {db} from '../db.js'

export const getRecipes = (req, res)=> { // This gets all of our recipes
const q = "SELECT * FROM recipes"

db.query(q, (err, data)=> {
    if(err) return res.status(500).send(err)

    return res.status(200).json(data)
})
}

export const getRecipe = (req, res)=> {
   const q = "SELECT r.id, `username`, `title`, `description`, r.img FROM login l JOIN recipes r ON l.id = r.uid WHERE r.id = ?"

   db.query(q, [req.params.id], (err, data)=> {
    if(err) return res.json(err)

    return res.status(200).json(data[0])
   })
}

export const addRecipe = (req, res)=> {
    
    // const token = req.cookies.access_token;
    // console.log("Checking if token is here")
    // console.log(req.cookies.access_token)
    // console.log(token)
    // if (!token) return res.status(401).json("Not Authenticated!")

    // jwt.verify(token, "jwtkey", (err, userInfo) => {
    //     if (err) return res.status(403).json("Token is not valid")

        const q = "INSERT INTO recipes (title, description, img, food, user) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.food,
            req.body.user
           // userInfo.id,
        ]

        console.log(values)

        db.query(q, [values], (err, data)=> {
            if (err) return res.status(500).json(err)
            return res.json("Post has been created!")
        })
}

export const deleteRecipe = (req, res)=> {
    res.json("This is a recipe")
}

export const updateRecipe = (req, res)=> {
    res.json("This is a recipe")
}