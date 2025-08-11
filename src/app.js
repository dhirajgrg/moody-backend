import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import songsRoutes from "./routes/songs.route.js"

const app = express()
app.use(express.json())

const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:4173",
	process.env.FRONTEND_URL,
]

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true)

			if (allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error("Not allowed by CORS"))
			}
		},
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
)

app.use("/", songsRoutes)

export default app
