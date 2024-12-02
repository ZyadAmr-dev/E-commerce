import express from "express";
import searchOnProductController from "../../controllers/searchOnProductController"
const router = express.Router()

router.get('/search', searchOnProductController.search)

export default router