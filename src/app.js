import dotenv from "dotenv"
dotenv.config()

import songsRoutes from "./routes/songs.route.js"
import express from "express"

import cors from "cors"

const app = express()
app.use(express.json())
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:4173",
	process.env.FRONTEND_URL, 
]

app.use(
	cors({
		origin: allowedOrigins,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
)

app.use("/", songsRoutes)

export default app
