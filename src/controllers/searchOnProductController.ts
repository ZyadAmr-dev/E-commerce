import SearchService from "../services/searchOnProductService";

const SearchController = {
    search: async (req, res, next) => {
        const { title, description } = req.query;

        try {
            const results = await SearchService.searchDocuments(String(title), String(description));
            return res.status(200).json({
                success: true,
                data: results
            });
        } catch (error) {
            console.error('Search failed:', error);
            return res.status(500).json({
                success: false,
                message: "Failed to perform search",
                error: error.message
            });
        }
    }
}

export default SearchController;
