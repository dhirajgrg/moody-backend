import express from "express"
import {
	getAllSongs,
	addSong,
	singleSong,
} from "../controller/songs.controller.js"
import multer from "multer"
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post("/songs/add", upload.single("file"), addSong)
router.get("/songs/all", getAllSongs)
router.get("/songs/:expression", singleSong)

export default router
