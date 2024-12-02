import { Request, Response, NextFunction } from "express"; 
import { generateToken } from "../utils/generateTokens";
import UserService from "../services/userService";
import hashing from "../utils/hashing";

const authController = {
    register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email } = req.body;

        try {
            const existingUser = await UserService.getUser({ email: email });

            if (existingUser) {
                res.status(400).json({ success: false, message: "User already exists" });
                return; 
            }

            const userInfo = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: await hashing.hash(req.body.password),
                phone: req.body.phone,
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                },
                role: req.body.role,
            };
            
            const newUser = await UserService.createUser(userInfo);

            let token;
            if(newUser){
                token = generateToken({
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role,
                });
            }

            res.status(201).json({ success: true, message: "Created successfully", user: newUser, token });
            return; 
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
            return
        }
    },

    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password } = req.body;

        try {
            const existingUser = await UserService.getUser({ email : email });
            console.log(existingUser)

            if (!existingUser) {
                res.status(400).json({ success: false, message: "User does not exist" });
                return;
            }

            if (hashing.checkHashing(existingUser.password, password)) { 
                res.status(400).json({ success: false, message: "Password is not correct" });
                return;
            }

            const token = generateToken({
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
            });

            res.status(200).json({ success: true, message: "Login successful", token });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
    
};

export default authController;
