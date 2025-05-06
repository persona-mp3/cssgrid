import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import {dirname} from 'path'
import {fileURLToPath } from 'url'


const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)
import { saveBookings, AuthUser, getDataById} from './tools.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "js")))
app.use(express.static(path.join(__dirname, "css")))
app.use(express.static(path.join(__dirname, "assets")))

// cors is to allow requests to be made from live servers ip address, 5500 which is default
// else yours is different and the requests are not made to the server update origin to the port
// this was a dev problem for me as natively, vscode is granted access for CORS 
// see documentation.txt for more under CORS
app.use(cors({
    origin: `http://localhost:5500`
}))


const PORT = 8080 || process.env.PORT

app.get("/dashboard", async (req, res) => {
    console.log("[dashboard endpoint]")
    res.status(200).render("dashboard")
})

app.get("/booking", (req, res) => {
    res.status(200).render("booking")
})

app.post('/booking', async (req, res) => {
    console.log(req.body);
    
    let bookingDetails = req.body;
    try {
        let response = await saveBookings(res, bookingDetails)
     } catch (err) {
        throw err
    }
})

app.post('/login', async (req, res) => {
    console.log("[login post endpoint]")
    await AuthUser(req, res)
})

app.post("/api/data", async(req, res) => {
    console.log(req.body)
    await getDataById(req, res)
})



app.listen(PORT, () => {
    console.log(`[listening...] on port ${PORT}`)
})