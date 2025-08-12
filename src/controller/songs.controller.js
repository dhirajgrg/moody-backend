import songModel from "../models/song.model.js"
import { uploadSong } from "../services/storage.service.js"

export async function addSong(req, res) {
	try {
		const { title, artist, expression } = req.body
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" })
		}

		const songsUrl = await uploadSong(req.file, "songs")

		const song = await songModel.create({
			title,
			artist,
			expression,
			songUrl: songsUrl.url,
		})

		res.status(201).json({ message: "Song added successfully", song })
	} catch (error) {
		res.status(500).json({
			message: "Failed to add song",
			error: error.message,
		})
	}
}

export async function getAllSongs(req, res) {
	try {
		const songs = await songModel.find()

		if (songs.length === 0) {
			return res.status(404).json({ message: "No songs found" })
		}

		res.status(200).json({ message: "success", songs })
	} catch (error) {
		res.status(500).json({
			message: "Failed to get songs",
			error: error.message,
		})
	}
}

export async function getSong(req, res) {
	try {
		const { expression } = req.params

		const songs = await songModel.find({
			expression: { $regex: `^${expression}$`, $options: "i" },
		})

		if (songs.length === 0) {
			return res.status(404).json({ message: "No songs found" })
		}

		res.status(200).json({ message: "success", songs })
	} catch (error) {
		res.status(500).json({
			message: "Failed to get songs",
			error: error.message,
		})
	}
}
