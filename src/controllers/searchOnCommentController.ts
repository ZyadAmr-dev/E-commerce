import SearchOnCommentService from "../services/searchOnCommentService";

const SearchOnCommentController = {
    search: async (req, res, next): Promise<void> => {
        const { text } = req.query;
        const prodId = req.params.prodId

        try {
            if (typeof text !== 'string') {
                res.status(400).json({ success: false, message: "Invalid search text" });
                return;
            }

            const comments = await SearchOnCommentService.search(text, prodId);

            if (comments.length === 0) {
                res.status(404).json({ success: true, message: "No comments found" });
            } else {
                res.status(200).json({ success: true, data: comments });
            }
        } catch (error) {
            console.error("Error searching comments:", error);
            res.status(500).json({ success: false, message: `Error searching comments: ${error.message}` });
        }
    }
};

export default SearchOnCommentController;
