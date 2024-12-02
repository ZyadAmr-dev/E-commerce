import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const saltRounds = process.env.SALT ? parseInt(process.env.SALT) : 10; 

const hash = async (plainPassword: string): Promise<string> => {
    return await bcrypt.hash(plainPassword, saltRounds);
};

const checkHashing = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export default { hash, checkHashing };
