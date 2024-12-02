import mongoose from "mongoose";

// SingleTon

class DB {
    private static instance: DB;
    private constructor() {} 

    public static async getInstance(mongoUri: string): Promise<DB> {
        if (!DB.instance) {
            DB.instance = new DB(); 
            await mongoose.connect(mongoUri, {});

            console.log("MongoDB connected successfully.");
        } else {
            console.log("Returning existing DB instance.");
        }
        return DB.instance;
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
    }
}

export default DB;
