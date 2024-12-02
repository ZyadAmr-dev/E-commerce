import WishlistService from "../services/wishlistService";

const WishlistController = {
    addAnItem: async (req, res, next) => {
        const userId = req.user.id;
        const prodId = req.params.prodId;

        try {
            const checkingItem = await WishlistService.checkItem(userId, prodId);

            if (checkingItem) {
                return res.status(200).json({ success: true, message: 'Item already exists in the wishlist' });
            }

            await WishlistService.addItem(userId, prodId);
            return res.status(200).json({ success: true, message: 'Added to wishlist' });
        } catch (err) {
            console.error(err); 
            return res.status(500).json({ success: false, message: 'Error adding item to wishlist', error: err.message });
        }
    },

    getItems: async (req, res, next) => {
        const userId = req.user.id;

        try {
            const wishlist = await WishlistService.getWishlist(userId);

            if (!wishlist || wishlist.items.length === 0) {
                return res.status(200).json({ success: true, message: 'No items in wishlist' });
            }

            return res.status(200).json({ success: true, data: wishlist });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error fetching wishlist', error: err.message });
        }
    },
    
};

export default WishlistController;
