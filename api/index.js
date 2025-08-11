import serverless from "serverless-http"
import app from "../src/app.js"
import connectDB from "../src/db/db.js"

// Connect to DB once per cold start
await connectDB()

export const handler = serverless(app)
