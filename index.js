import express from 'express'
import recipeRoutes from './routes/recipe.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../frontend/src/assets/upload")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) { // We are going to upload a single file
    const file = req.file;
    res.status(200).json(file.filename)
});



app.use('/api/recipe', recipeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth/', authRoutes)

app.listen(8800, ()=> console.log("Connected and running on 8800"))