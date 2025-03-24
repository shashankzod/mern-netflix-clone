import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

export const generateTokenAndCookie = (userID, res) => {
    const token = jwt.sign({userID}, ENV_VARS.JWT_SECRET, 
        {expiresIn: "30d"});
        res.cookie("jwt_netflix", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite : "strict",
            secure: ENV_VARS.NODE_ENV !== "development",
        })
        return token;
}
