import { userSchema } from "../validationSchema/authSchema";

export const validUser = async (req, res, next) => {
    try {
        await userSchema.validateAsync(req.body)
        next()
    } catch(err) {
        return res.status(400).send({ err: err.details[0].message });
    }
}

export default {
    validUser,
    
};
