import { ObjectId } from "mongoose";
import { User, IUser } from "../models/userModel";
import { FilterQuery } from "mongoose";


class UserService {
    public static async getUserById(id: ObjectId): Promise<IUser | null> {
        try {
            return await User.findById(id);
        } catch (err) {
            throw new Error(`Error fetching user by ID: ${(err as Error).message}`);
        }
    }

    public static async deleteUserById(id: ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
        try {
            return await User.deleteOne({_id: id})
        } catch (err) {
            throw new Error(`Error fetching user by ID: ${(err as Error).message}`);
        }
    }

    public static async getUser(fields: FilterQuery<IUser>): Promise<IUser | null> {
        try {
            return await User.findOne(fields);
        } catch (err) {
            throw new Error(`Error fetching user: ${(err as Error).message}`);
        }
    }    

    public static async updateUserById(id: ObjectId, fields: Partial<IUser>): Promise<{ acknowledged: boolean, modifiedCount: number }> {
        try {
            const result = await User.updateOne({ _id: id }, { $set: fields });
            return {
                acknowledged: result.acknowledged,
                modifiedCount: result.modifiedCount,
            };
        } catch (err) {
            throw new Error(`Error updating user by ID: ${(err as Error).message}`);
        }
    }

    public static async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return await user.save(); 
    }

}

export default UserService;
