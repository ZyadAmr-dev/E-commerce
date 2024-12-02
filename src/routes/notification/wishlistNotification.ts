import express from "express";
import { WishlistManager, UserObserver } from "../../notifications/wishlist";

const router = express.Router();
const wishlistManager = new WishlistManager();

// Array to store all connected clients
const clients: UserObserver[] = [];

router.get('/notifications', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const client = new UserObserver(res);
    
    // Attach the new observer to the WishlistManager
    wishlistManager.attach(client);
    clients.push(client); // Optionally store clients

    // Remove client from observers when the connection is closed
    req.on('close', () => {
        wishlistManager.detach(client);
        clients.splice(clients.indexOf(client), 1); // Clean up the client array
    });
});

export default router;
