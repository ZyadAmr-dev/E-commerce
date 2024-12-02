import { NextFunction, Request, Response } from "express";
import AnalyticsService from "../services/analyticsService";

const analyticsController = {
    profitInInterval: async (req, res, next): Promise<void> => {
        const userId = req.user.id;  
        const { startDate, endDate } = req.query;

        try {
            const salesPerInterval = await AnalyticsService.getTotalSales(new Date(startDate), new Date(endDate), userId);

            if (salesPerInterval === 0) { 
                res.status(200).json({ success: true, message: "You don't have any sales yet." });
                return;
            }

            res.status(200).json({ success: true, data: salesPerInterval, message: "Your sales" });
        } catch (err) {
            console.error("Error fetching sales per interval:", err);
            res.status(500).json({ success: false, message: `Error: ${err.message}` });
        }
    },

    getAOV: async (req, res, next): Promise<void> => {
        const userId = req.user.id;

        try {
            const aov = await AnalyticsService.getAverageOrderValue(userId);

            res.status(200).json({ success: true, averageOrderValue: aov, message: "Average Order Value" });
        } catch (err) {
            console.error("Error fetching average order value:", err);
            res.status(500).json({ success: false, message: `Error: ${err.message}` });
        }
    }
};

export default analyticsController;
