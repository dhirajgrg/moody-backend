import dotenv from "dotenv"
dotenv.config()

import songsRoutes from "./routes/songs.route.js"
import express from "express"

import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", songsRoutes)

export default app
