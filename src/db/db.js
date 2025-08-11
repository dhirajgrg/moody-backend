import mongoose from "mongoose"

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL)
		console.log(` Connected to DB`)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

export default connectDB
