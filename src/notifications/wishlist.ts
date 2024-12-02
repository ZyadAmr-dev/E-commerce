import ProductService from "../services/productService";
import { Types } from "mongoose";

interface Observer {
    update(data: any): void;
}

abstract class Subject {
    protected observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data: any): void {
        for (const observer of this.observers) {
            observer.update(data);
        }
    }
}

export class WishlistManager extends Subject {
    async markAvailable(prodId: Types.ObjectId): Promise<void> {
        // Mark the product as available
        await ProductService.makeAvailable(prodId);
        
        // Notify all observers about the available product
        const notificationData = { prodId }; // Data to send to observers
        this.notify(notificationData);
    }
}

// UserObserver Class
export class UserObserver implements Observer {
    private response: any;

    constructor(response: any) {
        this.response = response;
    }

    update(data: any): void {
        // Logic to send notification (e.g., via email or SSE)
        this.response.write(`data: Product ${data.prodId} is now available!\n\n`);
    }
}

// // Example Usage
// const wishlistManager = new WishlistManager();

// const userResponse = {}; // This would be the user's response object (e.g., from SSE or WebSocket)
// const userObserver = new UserObserver(userResponse);
// wishlistManager.attach(userObserver);

// When marking a product as available
// wishlistManager.markAvailable('');
