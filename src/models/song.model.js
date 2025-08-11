import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},

    expression: {
        type: String,
        required: true
    },
	songUrl: {
		type: String,
		required: true,
	},
})

const songModel = mongoose.model("song", songSchema)
export default songModel
