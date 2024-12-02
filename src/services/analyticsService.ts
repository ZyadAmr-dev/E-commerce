import { Types } from 'mongoose';
import { Order, IOrder } from "../models/orderModel";

class AnalyticsService {
    public static async getTotalSales(start: Date, end: Date, userId: Types.ObjectId) {
        try {
            const sales = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: start,
                            $lte: end,
                        },
                        userId: userId,
                        status: "confirmed"
                    }
                },
                {
                    $group: {
                        _id: null, 
                        totalSales: { $sum: '$totalPrice' }
                    }
                }
            ]);

            const returnedValue = sales.length > 0 ? sales[0].totalSales : 0;
            return returnedValue;
        } catch(err) {
            throw new Error(`Error fetching total sales: ${err.message}`);
        }
    }

    public static async getAverageOrderValue(userId: Types.ObjectId): Promise<number> {
        try {
            const aov = await Order.aggregate([
                {
                    $match: {
                        userId: userId,
                        status: "confirmed"
                    }
                },
                {
                    $group: {
                        _id: null,
                        averageOrderValue: { $avg: "$totalPrice" }
                    }
                }
            ]);

            return aov.length > 0 ? aov[0].averageOrderValue : 0; 
        } catch (error) {
            console.error("Error fetching average order value:", error);
            throw new Error(`Error fetching average order value: ${error.message}`);
        }
    }


    // You can add more methods for other analytics as needed...
}

export default AnalyticsService;
