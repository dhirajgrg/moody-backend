import songModel from "../models/song.model.js"
import { uploadSong } from "../services/storage.service.js"

export async function addSong(req, res) {
	try {
		const { title, artist, expression } = req.body
		console.log(req.file)
		if (!req.file) {
			return res.status(400).json({ message: "no file uploaded" })
		}
		// upload song to Storage
		const songsUrl = await uploadSong(req.file, "songs")

		// save song to DB
		const song = await songModel.create({
			title,
			artist,

			expression,
			songUrl: songsUrl.url,
		})
		res.status(201).json({ mesage: "songs added successfully", song })
	} catch (error) {
		res.status(500).json({ message: "fail to add songs", error })
	}
}
export async function getAllSongs(req, res) {
	try {
		const songs = await songModel.find()
		if (!songs) {
			return res.status(404).json({ message: "songs not found" })
		}
		res.json(songs)
	} catch (error) {
		res.status(500).json({ message: "fail to get songs", error })
	}
}

export async function singleSong(req, res) {
	try {
		const { expression } = req.params
		const song = await songModel.findOne({ expression })
		if (!song) {
			return res.status(404).json({ message: "song not found" })
		}
		res.status(200).json({ message: "success", song })
	} catch (error) {
		res.status(500).json({ message: "fail to get song", error })
	}
}
