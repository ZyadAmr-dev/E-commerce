import express from "express";
import searchOnCommentController from "../../controllers/searchOnCommentController"
const router = express.Router()

router.get('/search/:prodId/comments', searchOnCommentController.search)

export default router